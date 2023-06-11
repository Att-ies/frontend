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
import NextHead from 'next/head';
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

function Head() {
  return (
    <NextHead>
      <title>Atties</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0 viewport-fit=cover"
      />
      <meta name="theme-color" content="#000000" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale=5.0, user-scalable=yes"
      />
      <meta property="og:title" content="아띠즈:art:" />
      <meta name="og:description" content="졸업작품 거래 플랫폼, 아띠즈:art:" />
      <meta property="og:type" content="website" />
      <meta
        name="url"
        property="og:url"
        content="https://user-images.githubusercontent.com/62178788/218947618-632d91ec-c4e6-4192-9ff6-66205ad6d635.svg"
      />
      <meta
        name="image"
        property="og:image"
        content="https://user-images.githubusercontent.com/62178788/218947618-632d91ec-c4e6-4192-9ff6-66205ad6d635.svg"
      />
      <meta
        name="article"
        property="og:article:author"
        content="졸업작품 거래 플랫폼"
      />
    </NextHead>
  );
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

    return (
      <div className="flex h-screen w-screen justify-center bg-slate-50 ">
        <LayoutCss>{children}</LayoutCss>
      </div>
    );
  };

  if (loading) return <Loader />;

  return (
    <>
      <Head />
      <GoogleScript />
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <PersistGate loading={null} persistor={persistor}>
                <div>
                  <Layout>
                    <Component {...pageProps} userInfo={userData} />
                  </Layout>
                </div>
              </PersistGate>
            </Hydrate>
          </QueryClientProvider>
        </Provider>
      </Suspense>
    </>
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
