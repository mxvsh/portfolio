import { SiNodedotjs, SiReact } from 'react-icons/si';

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
	{
		name: 'Node.js',
		icon: SiNodedotjs,
		description: "A JavaScript runtime built on Chrome's V8 JavaScript engine",
		tags: [
			'express',
			'passport',
			'strapi',
			'jest',
			'nodemailer',
			'bcrypt',
			'jsonwebtoken',
		],
		projects: [],
	},
];
