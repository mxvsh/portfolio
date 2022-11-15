import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import {
	RiGithubLine,
	RiLinkedinLine,
	RiTwitterLine,
	RiInstagramLine,
	RiAtLine,
} from 'react-icons/ri';
import {
	GITHUB_USERNAME,
	LINKEDIN_USERNAME,
	TWITTER_USERNAME,
	INSTAGRAM_USERNAME,
} from '@/config/social';
import { EMAIL } from '@/config/profile';

type SocialItemProps = {
	icon: React.ReactNode;
	link: string;
	clr: string;
	clr2?: string;
};
const SocialItem: React.FC<SocialItemProps> = ({ icon, link, clr, clr2 }) => {
	return (
		<Box
			p={2}
			bg={`gray.100`}
			color={`${clr}.400`}
			rounded='xl'
			fontSize='3xl'
			cursor='pointer'
			transition={'all 0.2s ease-in-out'}
			_hover={{
				bg: clr2 || `${clr}.100`,
			}}
			_active={{
				transform: 'scale(0.9)',
			}}
			onClick={() => {
				window.open(link, '_blank');
			}}
		>
			{icon}
		</Box>
	);
};

const Social: React.FC = () => {
	return (
		<HStack>
			<SocialItem
				icon={<RiGithubLine />}
				link={`https://github.com/${GITHUB_USERNAME}`}
				clr='gray'
				clr2='gray.300'
			/>
			<SocialItem
				icon={<RiLinkedinLine />}
				link={`https://www.linkedin.com/in/${LINKEDIN_USERNAME}`}
				clr='blue'
			/>
			<SocialItem
				icon={<RiTwitterLine />}
				link={`https://twitter.com/${TWITTER_USERNAME}`}
				clr='twitter'
			/>
			<SocialItem
				icon={<RiInstagramLine />}
				link={`https://www.instagram.com/${INSTAGRAM_USERNAME}`}
				clr='pink'
			/>

			<SocialItem icon={<RiAtLine />} link={`mailto:${EMAIL}`} clr='orange' />
		</HStack>
	);
};

export default Social;
