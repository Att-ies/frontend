import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '@features/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto w-full max-w-[375px]">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}
