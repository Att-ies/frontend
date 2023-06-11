import '../styles/globals.css';

import Loader from '@components/common/Loader';
import GoogleScript from '@components/GoogleScript';
import store from '@features/store';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { pageview } from '@utils/gtag';
import { getToken } from '@utils/localStorage/token';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import React, { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useWindowSize } from '@hooks/common/useWindowSize';

import styled, { StyledComponent } from 'styled-components';

const persistor = persistStore(store);

interface AppExtendedProps extends AppProps {
  userData: User;
}
let vh = 0;
export default function App({
  Component,
  pageProps,
  userData,
}: AppExtendedProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (router.pathname.includes('auth') || router.pathname === '/begin')
      return;
    const token = getToken();
    if (!token.accessToken) router.replace('/auth/login');
  }, [router]);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', end);
    };
  }, []);

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            suspense: true,
            useErrorBoundary: true,
          },
          mutations: { retry: false, useErrorBoundary: true },
        },
      }),
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="flex h-screen w-screen justify-center bg-slate-50 ">
      <Head>
        <title>Atties</title>
      </Head>
      <GoogleScript />
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <PersistGate loading={null} persistor={persistor}>
                <Layout>
                  <Component {...pageProps} userInfo={userData} />
                </Layout>
              </PersistGate>
            </Hydrate>
          </QueryClientProvider>
        </Provider>
      </Suspense>
    </div>
  );
}
const queryClient = new QueryClient();
export { queryClient };

function Layout({ children }: PropsWithChildren<{}>) {
  const windowSize = useWindowSize();

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [windowSize.height]);

  return <LayoutCss>{children}</LayoutCss>;
}

const LayoutCss = styled.div`
  min-height: calc(var(--var, 1vh) * 200);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  max-width: 26.25rem;
  overflow-y: scroll;
  background-color: white;
  padding: 1.5rem;
`;

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const accessToken = getCookie('accessToken', ctx);

  try {
    let res = await axios(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/me`,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );
    return { pageProps, userData: res.data };
  } catch (err) {
    console.log(err);
    return { pageProps };
  }
};
