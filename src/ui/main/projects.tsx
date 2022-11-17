import React from 'react';
import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { SiReact, SiNodedotjs } from 'react-icons/si';
import { getTagColor } from '@/utils/colors';

type ProjectCardProps = {
	title: string;
	description: string;
	thumbnails: string[];
	tech: string[];
	clr: string;
	icon: React.ReactNode;
};
const ProjectCard: React.FC<ProjectCardProps> = ({
	title,
	description,
	// thumbnails,
	tech,
	clr,
	icon,
}) => {
	return (
		<Box
			p={4}
			bg='white'
			rounded='xl'
			role='group'
			shadow='base'
			transition='all 0.2s ease-in-out'
			cursor='pointer'
			position='relative'
			_hover={
				{
					// shadow: 'md',
					// borderColor: `white`,
					// transform: 'scale(1.05)',
				}
			}
		>
			<Box
				p={2}
				position='absolute'
				right={4}
				top={-8}
				bg={'white'}
				color={`${clr}.500`}
				fontSize='4xl'
				borderWidth='8px'
				borderColor='gray.100'
				borderRadius='20px'
				_groupHover={{
					transform: 'scale(1.1)',
				}}
				transition='all 0.2s ease-in-out'
			>
				{icon}
			</Box>
			<Heading size='md'>{title}</Heading>
			<Text mt={2} color='gray.500'>
				{description}
			</Text>

			<Flex mt={4} gap={2} flexWrap='wrap'>
				{tech.map((t, index) => (
					<Badge colorScheme={getTagColor(index)} key={t}>
						{t}
					</Badge>
				))}
			</Flex>
		</Box>
	);
};

const Projects = () => {
	return (
		<Box px={{ base: 4, lg: 0 }} py={{ base: 12, lg: 24 }} bg='gray.100'>
			<Box maxW='7xl' m='auto' rounded='50px'>
				<Heading mt={2} size='2xl' color='gray.500'>
					My projects
				</Heading>

				<SimpleGrid mt={12} columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
					<ProjectCard
						title='Product Invoice'
						description='An open-source projects built with Next.js and Chakra-UI. It helps you add products and generate invoices.'
						thumbnails={['/images/1.png', '/images/2.png']}
						tech={['React', 'Next.js', 'Chakra UI']}
						icon={<SiReact />}
						clr='blue'
					/>
					<ProjectCard
						title='Snazzy'
						description='An open-source Telegram chat bot with utilities commands, and helps you get results across web right on Telegram.'
						thumbnails={['/images/1.png', '/images/2.png']}
						tech={['Node.js', 'Axios', 'Telegram']}
						icon={<SiNodedotjs />}
						clr='green'
					/>
				</SimpleGrid>
			</Box>
		</Box>
	);
};

export default Projects;
