import React from 'react';
import { Stack } from '@chakra-ui/react';

type Props = {
	children: React.ReactNode;
};
const MainLayout: React.FC<Props> = ({ children }) => {
	return (
		<Stack spacing={12} pb={12} overflow='hidden'>
			{children}
		</Stack>
	);
};

export default MainLayout;
