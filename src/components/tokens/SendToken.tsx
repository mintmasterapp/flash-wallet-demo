import React, { useState } from 'react';
import { Button } from '../../lib';
import SendHBarModal from './SendTokenForm';
import { useWalletConnector } from '../../utils/walletConnector';
import { senHbar } from '../../utils/accountServices';

const SendHBar = () => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { account, sendTransaction, isConnected } = useWalletConnector();

  const onSubmit = async ({
    accountId,
    amount,
  }: {
    accountId: string;
    amount: string;
  }) => {
    try {
      setLoading(true);
      const transByte = await senHbar(account, accountId, amount);
      sendTransaction(transByte, (result: any) => {
        if (result) {
          console.log('result', result);
        }
      });
      setLoading(false);
      setIsActiveModal(false);
    } catch (error: any) {
      console.log('error', error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <SendHBarModal
        isActiveModal={isActiveModal}
        loading={loading}
        onSubmit={onSubmit}
        onClose={setIsActiveModal}
      />
      <Button
        name="Send HBAR"
        onClick={() => setIsActiveModal(true)}
        disabled={!isConnected}
      />
    </>
  );
};

export default SendHBar;
