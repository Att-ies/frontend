import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../features/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto w-full max-w-[360px]">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </div>
  );
}
