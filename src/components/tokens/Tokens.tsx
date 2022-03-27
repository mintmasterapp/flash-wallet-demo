import React from 'react';
import SendToken from './SendToken';

const Token = ({ token }: { token: any }) => {
  return (
    <div className="rounded-lg shadow-lg border-1 border-grey-200 w-full">
      <div className="bg-gray-50 px-4 py-1 rounded-t-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl">{`${token.name} (${token.symbol})`}</h1>
          <h1 className="text-xs text-grey-500">ddd</h1>
        </div>
        <div className="bg-black text-white px-2 py-2 rounded-lg">
          <h1 className=" text-xs">Balance</h1>
          <h1 className=" text-xl">{token.balance}</h1>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row rounded-b-lg">
        <div className="mr-2">
          <SendToken />
        </div>
      </div>
    </div>
  );
};

const Tokens = () => {
  const tokens: any = [];
  return (
    <div className="grid grid-cols-2 gap-4">
      {tokens.map((token: any) => (
        <Token key={token.tokenId} token={token} />
      ))}
    </div>
  );
};

export default Tokens;
