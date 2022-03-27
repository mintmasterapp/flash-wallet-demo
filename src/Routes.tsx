import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import { Home, Tokens, Topics } from './pages';
import './index.css';
import Layout from './components/layouts';
import { WalletConnectorProvider } from './utils/walletConnector';
import store from './utils/store';

function WaitForStateRehydration({ children }: { children: any }) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

function Routes() {
  return (
    <HashRouter basename="/">
      <StoreProvider store={store}>
        <WaitForStateRehydration>
          <WalletConnectorProvider>
            <Layout>
              <Route exact path="/" component={Home} />
              <Route exact path="/tokens" component={Tokens} />
              <Route exact path="/topics" component={Topics} />
            </Layout>
          </WalletConnectorProvider>
        </WaitForStateRehydration>
      </StoreProvider>
    </HashRouter>
  );
}

export default Routes;
