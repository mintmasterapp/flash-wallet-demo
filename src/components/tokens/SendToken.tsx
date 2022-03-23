import React, { useState } from 'react';
import { Button } from '../../lib';
import { sendRewards } from '../../utils/tokenService';
import SendHBarModal from './SendTokenForm';
import { useConnection } from '../../utils/connection';

const SendHBar = () => {
  const { client } = useConnection();
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
      await sendRewards({
        client,
        destinationAccount: accountId,
        tokenCount: parseInt(amount, 10),
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
      <Button name="Send Rewards" onClick={() => setIsActiveModal(true)} />
    </>
  );
};

export default SendHBar;
