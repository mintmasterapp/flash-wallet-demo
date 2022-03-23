import React from 'react';
import { useStoreState, State } from 'easy-peasy';
import { StoreModal } from '../../utils/store';

const Account = ({ account }: { account: any }) => {
  return (
    <div className="rounded-lg shadow-lg border-1 border-grey-200 w-full">
      <div className="bg-gray-50 px-4 py-1 rounded-t-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl">{account.name}</h1>
          <h1 className="text-xs text-grey-500">
            (accountId:{account.accountId})
          </h1>
        </div>
        <div className="bg-black text-white px-2 py-2 rounded-lg">
          <h1 className=" text-xs">Balance</h1>
          <h1 className=" text-xl">{account.balance} HBAR</h1>
        </div>
      </div>
      <div className="bg-white px-4 py-5">
        <p>Private Key</p>
        <p className="text-blue-400 break-words">{account.privateKey}</p>
        <br />
        <p>Public Key</p>
        <p className="text-blue-400 break-words">{account.publicKey}</p>
      </div>
    </div>
  );
};

const Accounts = () => {
  const { accountModal } = useStoreState((state: State<StoreModal>) => state);

  return (
    <div className="grid grid-cols-3 gap-4">
      {accountModal.accounts.map((account) => (
        <Account key={account.accountId} account={account} />
      ))}
    </div>
  );
};

export default Accounts;
