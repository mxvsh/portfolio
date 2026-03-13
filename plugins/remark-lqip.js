import { visit } from 'unist-util-visit'
import path from 'node:path'
import { existsSync, readdirSync } from 'node:fs'
import sharp from 'sharp'

function packColor11bit(c) {
  const r = Math.round((c.r / 0xff) * 0b1111)
  const g = Math.round((c.g / 0xff) * 0b1111)
  const b = Math.round((c.b / 0xff) * 0b111)
  return (r << 7) | (g << 3) | b
}

function packColor10bit(c) {
  const r = Math.round((c.r / 0xff) * 0b111)
  const g = Math.round((c.g / 0xff) * 0b1111)
  const b = Math.round((c.b / 0xff) * 0b111)
  return (r << 7) | (g << 3) | b
}

/**
 * 基于纯CSS的LQIP实现
 * 参考: https://frzi.medium.com/lqip-css-73dc6dda2529
 * 将3个颜色打包到单个RGBA hex值中，在CSS中解包生成网格渐变
 */

/**
 * 使用Sharp从图像中提取3个特定位置的颜色
 */
async function extractColors(imagePath) {
  try {
    // 使用sharp将图像缩放到3x3并获取原始像素数据
    const { data, info } = await sharp(imagePath)
      .resize(3, 3, {
        fit: 'fill',
        kernel: 'lanczos3', // 高质量缩放
      })
      .raw()
      .toBuffer({ resolveWithObject: true })

    const pixels = []

    // 从原始像素数据中提取RGB值
    for (let a = 0; a < data.length; a += info.channels) {
      pixels.push({
        r: data[a],
        g: data[a + 1],
        b: data[a + 2],
      })
    }

    // 选择3个特定位置的颜色：左上角(0)、中心偏右(4)、右下角(8)
    // 3x3网格的索引布局：
    // 0 1 2
    // 3 4 5
    // 6 7 8
    const [c0, c1, c2] = [pixels[0], pixels[4], pixels[8]]

    return [c0, c1, c2]
  } catch (error) {
    console.warn(`颜色提取失败: ${imagePath}`, error.message)
    return null
  }
}

/**
 * 将3个颜色打包到单个RGBA hex值中
 * 使用color.ts中的位打包方法：
 * - 第1个颜色：使用packColor11bit (R:4位, G:4位, B:3位)
 * - 第2个颜色：使用packColor11bit (R:4位, G:4位, B:3位)
 * - 第3个颜色：使用packColor10bit (R:3位, G:4位, B:3位)
 * 总共32位 = RGBA
 */
function packColorsToHex(colors) {
  const [c0, c1, c2] = colors

  // 使用color.ts中的位打包函数
  const pc0 = packColor11bit(c0) // 11位
  const pc1 = packColor11bit(c1) // 11位
  const pc2 = packColor10bit(c2) // 10位

  // 打包到32位：11 + 11 + 10 = 32位
  const combined = (BigInt(pc0) << 21n) | (BigInt(pc1) << 10n) | BigInt(pc2)

  // 转换为8位hex字符串
  const hex = '#' + combined.toString(16).padStart(8, '0')
  return hex
}

/**
 * 分析图像并生成LQIP hex值
 */
async function analyzeImageForLQIP(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata()
    const { width, height } = metadata

    // 检查图像是否不透明
    const stats = await sharp(imagePath).stats()
    if (!stats.isOpaque) {
      return null // 跳过透明图像
    }

    // 提取3个主要颜色
    const colors = await extractColors(imagePath)
    if (!colors) {
      return null
    }

    // 打包颜色为hex值
    const lqipHex = packColorsToHex(colors)

    return {
      width,
      height,
      lqipHex,
      colors, // 用于调试
    }
  } catch (error) {
    console.warn(`LQIP分析失败: ${imagePath}`, error.message)
    return null
  }
}

/**
 * 解析图像路径
 */
function resolveImagePath(imageUrl, filePath) {
  if (path.isAbsolute(imageUrl)) {
    return imageUrl
  }

  // 处理 Astro 的 ~ 路径别名
  if (imageUrl.startsWith('~/')) {
    const contentDir = path.dirname(filePath)
    const srcDir = path.dirname(path.dirname(contentDir))
    return path.resolve(srcDir, imageUrl.slice(2))
  }

  const fileDir = path.dirname(filePath || '')
  return path.resolve(fileDir, imageUrl)
}

/**
 * 处理单个图像节点
 */
async function processImageNode(node, filePath) {
  const imagePath = resolveImagePath(node.url, filePath)

  if (!existsSync(imagePath)) {
    return
  }

  const lqipData = await analyzeImageForLQIP(imagePath)
  if (!lqipData) {
    return
  }

  // 添加data属性用于CSS处理
  node.data = node.data || {}
  node.data.hProperties = node.data.hProperties || {}

  // 设置尺寸属性
  if (lqipData.width && lqipData.height) {
    node.data.hProperties.width = lqipData.width
    node.data.hProperties.height = lqipData.height
  }

  // 设置LQIP样式变量
  const style = node.data.hProperties.style || ''
  const lqipStyle = `--lqip:${lqipData.lqipHex}`

  node.data.hProperties.style = style ? `${style};${lqipStyle}` : lqipStyle
}

/**
 * Remark插件主函数
 */
function remarkLQIP() {
  return async (tree, file) => {
    const imagesToProcess = []

    // 收集所有图像节点
    visit(tree, 'image', (node) => {
      if (node.url && !node.url.match('^([a-z]+:)?//')) {
        imagesToProcess.push(node)
      }
    })

    // 并行处理所有图像
    await Promise.all(
      imagesToProcess.map(async (node) => {
        try {
          await processImageNode(node, file.path)
        } catch (error) {
          console.warn(`LQIP处理失败: ${node.url}`, error.message)
        }
      })
    )
  }
}

export default remarkLQIP

// 在构建环境中，我们可以通过堆栈跟踪获取调用上下文
function getCallerContext() {
  const stack = new Error().stack
  if (!stack) return null

  // 查找包含 /content/ 的文件路径（Windows和Linux兼容）
  const contentMatch = stack.match(/([^:\s]+[\/\\]content[\/\\][^:\s)]+)/i)
  if (contentMatch) {
    return contentMatch[1].replace(/\\/g, '/')
  }

  return null
}

export async function generateLQIPFromPath(src) {
  try {
    let imagePath

    if (typeof src === 'string') {
      imagePath = resolveImagePath(src, '')
    } else if (src && typeof src === 'object') {
      // 处理Astro ImageMetadata对象

      // 尝试多种方式获取原始文件路径
      if (src.fsPath) {
        imagePath = src.fsPath
      } else if (src.pathname) {
        imagePath = src.pathname
      } else if (src.src) {
        let cleanSrc = src.src

        // 移除Astro的特殊前缀和查询参数
        if (cleanSrc.includes('/@fs/')) {
          // 提取真实文件路径：/@fs/D:/Code/dnzzk2.icu/src/content/...
          cleanSrc = cleanSrc.split('/@fs/')[1]
          if (cleanSrc) {
            // 移除查询参数并规范化路径分隔符
            imagePath = cleanSrc.split('?')[0].replace(/\\/g, '/')
          }
        } else if (cleanSrc.startsWith('/_astro/')) {
          // 对于/_astro/路径，这是Astro优化后的路径
          // 尝试从调用上下文推断原始路径
          const callerContext = getCallerContext()

          if (callerContext) {
            // 从调用文件的目录中查找可能的图片文件
            const contextDir = path.dirname(callerContext)
            const assetsDir = path.join(contextDir, 'assets')

            // 尝试匹配文件扩展名
            const srcFileName = path.basename(cleanSrc)
            const fileExtension = path.extname(srcFileName)

            if (existsSync(assetsDir)) {
              // 在assets目录中查找同类型的文件
              const files = readdirSync(assetsDir)
              const matchingFile = files.find(
                (file) => path.extname(file) === fileExtension || file.includes(path.parse(srcFileName).name.split('.')[0])
              )

              if (matchingFile) {
                imagePath = path.join(assetsDir, matchingFile)
              }
            }
          }

          if (!imagePath) {
            console.log('无法推断原始路径，跳过LQIP生成:', cleanSrc)
            return null
          }
        } else {
          // 处理普通路径
          imagePath = resolveImagePath(cleanSrc.split('?')[0], '')
        }
      } else {
        console.warn('ImageMetadata对象缺少可用的路径属性:', Object.keys(src))
        return null
      }
    } else {
      console.warn('无效的图像源:', src)
      return null
    }

    if (!imagePath) {
      console.warn('无法解析图像路径:', src)
      return null
    }

    // 检查文件是否存在
    if (!existsSync(imagePath)) {
      console.warn(`图像文件不存在: ${imagePath}`)
      return null
    }

    // 分析图像并生成LQIP
    const result = await analyzeImageForLQIP(imagePath)
    return result ? result.lqipHex : null
  } catch (error) {
    console.warn('LQIP生成失败:', error.message)
    return null
  }
}
