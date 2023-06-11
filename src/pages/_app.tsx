import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState, Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';
import { useWindowSize } from '@hooks/common/useWindowSize';
import { getCookie } from 'cookies-next';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import axios from 'axios';
import Loader from '@components/common/Loader';
import GoogleScript from '@components/GoogleScript';
import store from '@features/store';
import { persistStore } from 'redux-persist';
import { pageview } from '@utils/gtag';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      useErrorBoundary: true,
    },
    mutations: { retry: false, useErrorBoundary: true },
  },
});

const persistor = persistStore(store);

interface AppExtendedProps extends AppProps {
  userData: User;
}

export default function App({
  Component,
  pageProps,
  userData,
}: AppExtendedProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true);
      pageview(url);
    };

    const handleRouteChangeEnd = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('hashChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('hashChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [router.events]);

  const Layout = ({ children }) => {
    const windowSize = useWindowSize();

    useEffect(() => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, [windowSize.height]);

    return <LayoutCss>{children}</LayoutCss>;
  };

  if (loading) return <Loader />;

  return (
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

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const accessToken = getCookie('accessToken', ctx);

  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/me`,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );

    return { pageProps, userData: res.data };
  } catch (err) {
    console.error('Failed to get user data:', err);
    return { pageProps };
  }
};
