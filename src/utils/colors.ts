const tagColors = [
	'orange',
	'green',
	'blue',
	'purple',
	'red',
	'yellow',
	'pink',
];

export const getTagColor = (pos: number) => {
	return tagColors[pos % tagColors.length];
};
