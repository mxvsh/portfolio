import { SiJavascript, SiReact } from 'react-icons/si';

type Project = {};

type Tech = {
	name: string;
	icon: React.ElementType;
	description: string;
	tags: string[];
	projects: Project[];
};

export const TECHNOLOGIES: Tech[] = [
	{
		name: 'React',
		icon: SiReact,
		description: 'A JavaScript library for building user interfaces',
		tags: [
			'redux',
			'react-router',
			'react-query',
			'react-hook-form',
			'react-spring',
			'react-icons',
			'react-testing-library',
		],
		projects: [],
	},
];
