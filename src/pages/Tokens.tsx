import React, { useState } from 'react';
import { Header, Button } from '../lib';
import CreateTokenModal from '../components/tokens/CreateTokenModal';
import AssociateTokenModal from '../components/tokens/AssociateTokenModal';
import Tokens from '../components/tokens/Tokens';
import { useWalletConnector } from '../utils/walletConnector';
import { createToken, tokenAssociate } from '../utils/tokenService';

function Home() {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [isActiveAssociateModal, setIsActiveAssociateModal] = useState(false);

  const { account, sendTransaction, isConnected } = useWalletConnector();

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
    const transByte = await createToken({
      account,
      tokenName,
      tokenSymbol,
    });
    sendTransaction(transByte, (result: any) => {
      if (result) {
        console.log('result', result);
      }
    });
    resetForm();
    setIsActiveModal(false);
  };

  const handleAssociateToken = async (
    { tokenId }: { tokenId: string },
    { resetForm }: { resetForm: any },
  ) => {
    const transByte = await tokenAssociate({
      account,
      tokenId,
    });
    sendTransaction(transByte, (result: any) => {
      if (result) {
        console.log('result', result);
      }
    });
    resetForm();
    setIsActiveAssociateModal(false);
  };

  return (
    <div>
      <Header title="Tokens">
        <Button
          name="Associate Token"
          onClick={() => setIsActiveAssociateModal(true)}
          disabled={!isConnected}
        />
        &nbsp;
        <Button
          name="Create Token"
          onClick={() => setIsActiveModal(true)}
          disabled={!isConnected}
        />
        {isActiveModal && (
          <CreateTokenModal
            loading={false}
            isActiveModal={isActiveModal}
            onClose={setIsActiveModal}
            onSubmit={handleCreateToken}
          />
        )}
        {isActiveAssociateModal && (
          <AssociateTokenModal
            loading={false}
            isActiveModal={isActiveAssociateModal}
            onClose={setIsActiveAssociateModal}
            onSubmit={handleAssociateToken}
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
