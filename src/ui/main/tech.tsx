import React from 'react';
import { Box, Center, Heading, HStack, SimpleGrid } from '@chakra-ui/react';
import {
	SiTypescript,
	SiReact,
	SiNodedotjs,
	SiMongodb,
	SiNextdotjs,
	SiSketch,
} from 'react-icons/si';
import { IoPrism } from 'react-icons/io5';

// const tagColors = [
// 	'red',
// 	'orange',
// 	'yellow',
// 	'green',
// 	'teal',
// 	'blue',
// 	'cyan',
// 	'purple',
// ];

type TechItemProps = {
	title: string;
	icon: React.ReactNode;
	clr: string;
	tags?: string[];
};
const TechItem: React.FC<TechItemProps> = ({
	title,
	icon,
	clr,
	// tags = [],
}) => {
	return (
		<Box
			// role='group'
			cursor='pointer'
			_active={{ transform: 'scale(0.95)' }}
			transition='all 0.2s ease-in-out'
			userSelect='none'
		>
			<Center>
				<Box
					rounded='xl'
					fontSize='7xl'
					color={`${clr}.500`}
					// bg={`${clr}.100`}
				>
					{icon}
				</Box>
			</Center>
			{/* <Center
				opacity={0}
				_groupHover={{
					opacity: 1,
				}}
				transition='all 0.3s ease-in-out'
			>
				<Heading mt={3} size='md' color={`${clr}.400`}>
					{title}
				</Heading>
			</Center> */}
			{/* {tags.length > 0 && (
				<HStack flexWrap='wrap' mt={4} spacing={0}>
					{tags.map((tag) => (
						<Badge
							key={tag}
							colorScheme={
								tagColors[Math.floor(Math.random() * tagColors.length)]
							}
						>
							{tag}
						</Badge>
					))}
				</HStack>
			)} */}
		</Box>
	);
};

const Tech = () => {
	return (
		<Box>
			<Box maxW='7xl' m='auto' rounded='50px'>
				<Heading mt={2} size='2xl'>
					Technologies, I have worked with...
				</Heading>

				<SimpleGrid mt={12} columns={{ base: 2, lg: 10 }} spacing={4}>
					<TechItem clr='blue' title='React' icon={<SiReact />} />
					<TechItem clr='blue' title='TypeScript' icon={<SiTypescript />} />
					<TechItem clr='green' title='Node.js' icon={<SiNodedotjs />} />
					<TechItem clr='gray' title='Prisma' icon={<IoPrism />} />
					<TechItem clr='green' title='MongoDB' icon={<SiMongodb />} />
					<TechItem clr='black' title='Next.js' icon={<SiNextdotjs />} />
					<TechItem clr='yellow' title='Sketch' icon={<SiSketch />} />
				</SimpleGrid>
			</Box>
		</Box>
	);
};

export default Tech;
