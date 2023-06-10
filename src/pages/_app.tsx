import '../styles/globals.css';

import Loader from '@components/common/Loader';
import GoogleScript from '@components/GoogleScript';
import store from '@features/store';
<<<<<<< HEAD
=======
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from '@components/common/Loader';
import GoogleScript from '@components/GoogleScript';
>>>>>>> dev
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { pageview } from '@utils/gtag';
import { getToken } from '@utils/localStorage/token';
<<<<<<< HEAD
import axios from 'axios';
import { getCookie } from 'cookies-next';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
=======
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react';

>>>>>>> dev
const persistor = persistStore(store);

interface AppExtendedProps extends AppProps {
  userData: User;
}

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

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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

      // 없으면 서비스 워커 등록
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
                <Component {...pageProps} userInfo={userData} />
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
