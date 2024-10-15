import { ReactNode, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import {
  AptosWalletAdapterProvider,
  NetworkName,
} from '@aptos-labs/wallet-adapter-react';

import NoSSR from '@/lib/NoSSR/NoSSR';

import store, { persistor } from '@/store/store';

// import GATrackingProvider from '@/utils/providers/GATrackingProvider';
import { ModalContextProvider } from '@/utils/contexts/ModalContext/ModalContext';

const ClientProvider = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient();
  const wallets = [new PetraWallet()];

  const providers = [
    {
      provider: AptosWalletAdapterProvider,
      props: {
        plugins: wallets,
        autoConnect: true,
        dappConfig: {
          network: NetworkName.Testnet,
        },
      },
    },
    { provider: QueryClientProvider, props: { client } },
    { provider: Provider, props: { store } },
    { provider: PersistGate, props: { loading: null, persistor: persistor } },
    { provider: NoSSR, props: {} },
    { provider: BrowserRouter, props: {} },
    // { provider: GATrackingProvider, props: {} },
    { provider: ModalContextProvider, props: {} },
  ];

  return (
    <Fragment>
      {providers.reduceRight(
        (accum, { provider: ProviderComponent, props: ProviderProps }) => {
          return (
            // @ts-ignore
            <ProviderComponent {...ProviderProps}>{accum}</ProviderComponent>
          );
        },
        children,
      )}
    </Fragment>
  );
};

export default ClientProvider;
