import Loader from '@components/common/Loader';
import GoogleScript from '@components/GoogleScript';
import { CONFIG } from '@config';
import store from '@features/store';
import { useWindowSize } from '@hooks/common/useWindowSize';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { pageview } from '@utils/gtag';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import type { AppContext, AppProps } from 'next/app';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css';

export const queryClient = new QueryClient({
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
      <div className="flex h-screen w-screen justify-center bg-slate-50">
        <div className="relative h-full w-full max-w-[26.25rem] overflow-y-scroll bg-white px-[1.5rem]">
          {children}
        </div>
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
                <Layout>
                  <Component {...pageProps} userInfo={userData} />
                </Layout>
              </PersistGate>
            </Hydrate>
          </QueryClientProvider>
        </Provider>
      </Suspense>
    </>
  );
}

const fetchAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/token`,
      {
        refreshToken,
      },
    );
    return response.data.accessToken;
  } catch (error: any) {
    throw new Error(`Fetching access token failed: ${error.message}`);
  }
};

const fetchUserData = async (accessToken: string) => {
  try {
    axios.defaults.headers.common['Authorization'] = accessToken;
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const resUserData = await axios('/members/me');
    return resUserData.data;
  } catch (error: any) {
    throw new Error(`Fetching user data failed: ${error.message}`);
  }
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (ctx.pathname.includes('/auth') || ctx.pathname.includes('/begin')) {
    return { pageProps };
  }

  const refreshToken = getCookie('refreshToken', ctx);
  if (!refreshToken) {
    if (!ctx.res) return;
    ctx.res.setHeader('Location', '/auth/login');
    ctx.res.statusCode = 302;
    ctx.res.end();
    return { pageProps };
  }

  try {
    const accessToken = await fetchAccessToken(refreshToken + '');
    setCookie('accessToken', accessToken, ctx);
    const userData = await fetchUserData(accessToken);
    return { pageProps, userData };
  } catch (error) {
    console.error(error);
    return { pageProps };
  }
};
