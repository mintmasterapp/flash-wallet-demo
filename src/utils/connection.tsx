import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Client, AccountBalanceQuery } from '@hashgraph/sdk';
import config from './config';

interface ConnectionConfig {
  client: any;
  balance: string;
  updateClientAccountBalance: any;
  getAccountBalance: any;
}

const ConnectionContext = React.createContext<ConnectionConfig>({
  client: null,
  balance: '',
  updateClientAccountBalance: () => {},
  getAccountBalance: () => {},
});

export function ConnectionProvider({ children = undefined as any }) {
  const [balance, setBalance] = useState<string>('');

  const getClient = () => {
    const client = Client.forTestnet();
    client.setOperator(config.accountId, config.privateKey);
    return client;
  };

  const getTokens = useCallback(async (accountId: any) => {
    const client = getClient();
    const accountBalance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(client);
    return accountBalance.tokens?.values;
  }, []);

  const getAccountBalance = async (accountId: any) => {
    const client = getClient();
    const accountBalance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(client);

    return accountBalance.hbars.toString();
  };

  const updateClientAccountBalance = useCallback(async (accountId) => {
    const client = getClient();
    const accountBalance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(client);

    // console.log(
    //   'getTokens',
    //   // eslint-disable-next-line no-underscore-dangle
    //   accountBalance.tokens?.toString(),
    // );
    setBalance(`${accountBalance.hbars.toString()}`);
  }, []);

  useEffect(() => {
    updateClientAccountBalance(config.accountId);
  }, [updateClientAccountBalance]);

  return (
    <ConnectionContext.Provider
      value={{
        client: getClient(),
        balance,
        updateClientAccountBalance,
        getAccountBalance,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  return useContext(ConnectionContext) as any;
}
