import React from 'react';
import { Box, Heading, HStack, Image, Spacer, Text } from '@chakra-ui/react';
import { PROFILE_PIC_URL } from '@/config/profile';

const About = () => {
	return (
		<Box py={6} position='relative'>
			<HStack
				p={12}
				m='auto'
				maxW='7xl'
				bg='green.500'
				color='white'
				rounded='50px'
				shadow='md'
			>
				<Box>
					<Heading mt={2} size='2xl'>
						About me
					</Heading>
					<Text mt={4} fontSize='xl' maxW='2xl'>
						Id incididunt voluptate non veniam amet fugiat. Velit ex irure ipsum
						laboris sint anim tempor minim laborum fugiat voluptate. Anim aliqua
						labore in ullamco. Nostrud magna cupidatat sunt veniam. Commodo
						fugiat nisi excepteur fugiat qui commodo. Cillum culpa sunt est
						cupidatat.
					</Text>
				</Box>
				<Spacer />
				<Image
					cursor='pointer'
					top={-130}
					position='relative'
					src={PROFILE_PIC_URL}
					alt='profile'
					rounded='60px'
					boxSize='250px'
					border='10px solid white'
					transition='all 0.2s ease-in-out'
					_hover={{
						transform: 'scale(1.05)',
						shadow: '2xl',
						borderWidth: '0px',
					}}
				/>
			</HStack>
		</Box>
	);
};

export default About;
