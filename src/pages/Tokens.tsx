import React, { useState } from 'react';
import { Header, Button } from '../lib';
import CreateTokenModal from '../components/tokens/CreateTokenModal';
import Tokens from '../components/tokens/Tokens';
import config from '../utils/config';
import { useConnection } from '../utils/connection';
import { createToken } from '../utils/tokenService';

function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  const { client } = useConnection();

  const handleCreateToken = async (
    {
      tokenName,
      tokenSymbol,
    }: {
      tokenName: string;
      tokenSymbol: string;
      initialSupply: string;
      decimals: string;
      defaultFreezeStatus: boolean;
    },
    { resetForm }: { resetForm: any },
  ) => {
    try {
      setLoading(true);
      const token = await createToken({
        client,
        tokenName,
        tokenSymbol,
        treasuryAccountId: config.accountId,
      });
      console.log('token', token);
      resetForm();
      setIsActiveModal(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error.message);
    }
  };

  return (
    <div>
      <Header title="Tokens">
        <Button name="Create Token" onClick={() => setIsActiveModal(true)} />
        {isActiveModal && (
          <CreateTokenModal
            loading={loading}
            isActiveModal={isActiveModal}
            onClose={setIsActiveModal}
            onSubmit={handleCreateToken}
          />
        )}
      </Header>
      <div className="py-10">
        <Tokens />
      </div>
    </div>
  );
}

export default Home;
