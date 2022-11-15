import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@/theme';
import '@/styles/float.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
