import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@/theme';
import '@/styles/float.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import Head from 'next/head';
import { FIRST_NAME, LAST_NAME } from '@/config/profile';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<title>{FIRST_NAME + ' ' + LAST_NAME}</title>
			</Head>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
