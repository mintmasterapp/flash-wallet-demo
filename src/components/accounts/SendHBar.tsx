import React, { useState } from 'react';
import { Button } from '../../lib';
import { sendHBars } from '../../utils/accountServices';
import SendHBarModal from './SendHBarForm';

const SendHBar = ({ account }: { account: any }) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async ({
    accountId,
    amount,
  }: {
    accountId: string;
    amount: string;
  }) => {
    try {
      setLoading(true);
      await sendHBars({
        accountId: account.accountId,
        privateKey: account.privateKey,
        destinationAccountId: accountId,
        amount: parseFloat(amount),
      });
      setLoading(false);
      setIsActiveModal(false);
    } catch (error) {
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
      <Button name="Send (ℏ)" onClick={() => setIsActiveModal(true)} />
    </>
  );
};

export default SendHBar;
