import React, { useState } from 'react';
import { useStoreActions, Actions } from 'easy-peasy';
import { AccountId } from '@hashgraph/sdk';
import { Header, Button } from '../lib';
import CreateAccountModal from '../components/accounts/CreateAccountModal';
import Accounts from '../components/accounts/Accounts';
import { useWalletConnector } from '../utils/walletConnector';
import { createAccount } from '../utils/accountServices';
import { StoreModal } from '../utils/store';
import SendHBar from '../components/tokens/SendToken';

function Home() {
  const { accountModal } = useStoreActions(
    (state: Actions<StoreModal>) => state,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const {
    account,
    sendTransaction,
    isConnected,
    chainId,
  } = useWalletConnector();

  const handleCreateAccount = async (
    {
      name,
      balance,
    }: {
      name: string;
      balance: string;
    },
    { resetForm }: { resetForm: () => void },
  ) => {
    setLoading(true);
    const { transByte, privateKey, publicKey } = await createAccount(
      account,
      balance,
    );
    sendTransaction(transByte, (result: any) => {
      if (result) {
        console.log('result', result);
        accountModal.addAccounts({
          // eslint-disable-next-line no-underscore-dangle
          accountId: new AccountId(
            result.accountId.shard.low,
            result.accountId.realm.low,
            result.accountId.num.low,
          ).toString(),
          privateKey,
          publicKey,
          name,
          balance,
          chainId,
        });
      }
    });

    resetForm();
    setIsActiveModal(false);
    setLoading(false);
  };

  return (
    <div>
      <Header title="Accounts">
        <SendHBar /> &nbsp;
        {/* <Button
          name="Create Account"
          onClick={() => setIsActiveModal(true)}
          disabled={!isConnected}
        /> */}
        {isActiveModal && (
          <CreateAccountModal
            loading={loading}
            isActiveModal={isActiveModal}
            onClose={setIsActiveModal}
            handleCreateAccount={handleCreateAccount}
          />
        )}
      </Header>
      <div className="py-10">
        <Accounts />
      </div>
    </div>
  );
}

export default Home;
