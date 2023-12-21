// src/pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMode } from '../styles/theme';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import GlobalStyle from '../styles/GlobalStyle'; // Importe seu estilo global aqui

export default function MyApp({ Component, pageProps }: AppProps) {
  const { theme } = useMode();
  const router = useRouter();

  const noLayoutPaths = ['/login', '/signup', '/recover'];
  const showLayout = !noLayoutPaths.includes(router.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle /> {/* Aplicar o estilo global */}
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}
