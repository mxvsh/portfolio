import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import robotsTxt from "astro-robots-txt";
import { rehypePlugins, remarkPlugins } from "./plugins";
import { SITE } from "./src/config";

const REDIRECTS: Map<string, string[]> = new Map([
  ["https://github.com/mxvsh", ["github", "gh"]],
  ["https://discord.gg/3kUSy2d", ["discord", "dc"]],
  ["https://youtube.com/@Monawwar", ["youtube", "yt"]],
  ["https://github.com/sponsors/mxvsh", ["sponsor"]],
  ["https://github.com/drivebase/drivebase", ["db", "drivebase"]],
  ["https://github.com/mxvsh/restflow", ["flow"]],
  ["https://github.com/mxvsh/wave", ["wave"]],
  ["https://svglogo.dev", ["svg"]],
  ["https://promptsplanet.dev", ["prompts", "webbin"]],
  ["mailto:send@mxv.sh?subjet=Hello+Monawwar!", ["mail", "email"]],
]);

function redirectsToObject(map: Map<string, string[]>): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [url, aliases] of map) {
    for (const alias of aliases) {
      result[`/${alias}`] = url;
    }
  }

  return result;
}

const redirects = redirectsToObject(REDIRECTS);

export default defineConfig({
	site: SITE.website,
	base: SITE.base,
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "viewport",
	},
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		syntaxHighlight: false,
		remarkPlugins,
		rehypePlugins,
	},
	integrations: [expressiveCode(), mdx(), react(), sitemap(), robotsTxt()],
	redirects
});
