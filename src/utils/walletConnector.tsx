/* eslint-disable no-param-reassign */
import React, { useContext, useState, useEffect, useMemo } from 'react';
import WalletConnect from '@walletconnect/client';
import { AccountId, Client } from '@hashgraph/sdk';
import QRCodeModal from '../components/QRCodeModal';
import SigningLoading from '../components/SigningLoading';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

interface WalletConnectorConfig {
  account: string | null;
  chainId: number;
  isConnected: boolean;
  connector: WalletConnect | null;
  connect: () => void;
  disconnect: () => void;
  sendTransaction: (transaction: any) => void;
}

const WalletConnectorContext = React.createContext<WalletConnectorConfig>({
  account: null,
  chainId: 0,
  isConnected: false,
  connector: null,
  connect: () => {},
  disconnect: () => {},
  sendTransaction: () => {},
});

export function WalletConnectorProvider({ children = undefined as any }) {
  const [chainId, setChainId] = useState(0);
  const [account, setAccount] = useState<string | null>(null);

  const [qrCodeValue, setQrCodeValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState(null);

  const [isActiveQr, setIsActiveQr] = useState(false);

  const connector = useMemo(
    () =>
      new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        clientMeta: {
          description: 'Flash Wallet Demo',
          url: 'https://flash-demo.vercel.app',
          icons: ['https://mintmaster.s3.us-east-1.amazonaws.com/flash.png'],
          name: 'Flash Demo',
        },
      }),
    [],
  );

  useEffect(() => {
    setIsConnected(connector.connected);
    setChainId(connector.chainId);
    if (connector.accounts && connector.accounts.length > 0) {
      setAccount(connector.accounts[0]);
    }
  }, [connector]);

  const connect = async () => {
    if (!connector.connected) {
      await connector.createSession();
      setIsActiveQr(true);
      setQrCodeValue(connector.uri);
      console.log('connector.uri', connector.uri);
    }
  };

  const sendTransaction = async (
    transByte: string,
    callback?: (result: any, error: any) => void,
  ) => {
    const request = {
      id: getRandomInt(1, 10000000),
      jsonrpc: '2.0',
      method: 'hedera_sendTransaction',
      params: [
        {
          from: account,
          data: transByte,
        },
      ],
    };
    setSigning(true);
    connector
      .sendCustomRequest(request)
      .then((result) => {
        console.log('result', result);
        if (callback) {
          callback(result, null);
        }
        setSigning(false);
      })
      .catch((err) => {
        if (callback) {
          callback(null, err);
        }
        console.log('err', err.message);
        setError(err.message);
      });
  };

  const disconnect = () => {
    connector.killSession();
  };

  connector.on('connect', (err, payload) => {
    if (err) {
      throw err;
    }
    setIsActiveQr(false);
    setIsConnected(true);
    const { accounts, chainId: chain } = payload.params[0];
    setAccount(accounts[0]);
    setChainId(chain);
  });

  connector.on('session_update', (err, payload) => {
    if (err) {
      throw err;
    }
    console.log('session_update', payload);
    setIsActiveQr(false);
    setIsConnected(true);
    const { accounts, chainId: chain } = payload.params[0];
    setAccount(accounts[0]);
    setChainId(chain);
  });

  connector.on('disconnect', (err) => {
    if (err) {
      throw err;
    }
    setIsConnected(false);
    setChainId(0);
    setAccount(null);
    setQrCodeValue('');
  });

  return (
    <WalletConnectorContext.Provider
      value={{
        isConnected,
        connector,
        connect,
        disconnect,
        chainId,
        account,
        sendTransaction,
      }}
    >
      {children}
      {isActiveQr && qrCodeValue.length > 0 && (
        <QRCodeModal
          isActiveModal={isActiveQr}
          qrCodeValue={qrCodeValue}
          onClose={() => setIsActiveQr(false)}
        />
      )}
      <SigningLoading
        isActiveModal={signing}
        error={error}
        onClose={() => {
          setSigning(false);
          setError(null);
        }}
      />
    </WalletConnectorContext.Provider>
  );
}

export function useWalletConnector() {
  return useContext(WalletConnectorContext) as any;
}
