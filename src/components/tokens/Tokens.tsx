import React, { useCallback, useEffect, useState } from 'react';

import { tokenGetInfo, getAccountTokenBalance } from '../../utils/tokenService';
import { Button } from '../../lib';
import { useConnection } from '../../utils/connection';
import config from '../../utils/config';
import SendToken from './SendToken';

const Token = ({ token }: { token: any }) => {
  const { client } = useConnection();
  const [tokenBalance, setTokenBalance] = useState<any>(0);
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTokenInfo = useCallback(async () => {
    try {
      setLoading(true);
      const tokenInfoResponse = await tokenGetInfo({
        client,
        tokenId: token.tokenId,
      });

      console.log('tokenInfoResponse', tokenInfoResponse);
      setTokenInfo(tokenInfoResponse);

      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [client, token.tokenId]);

  const getTokenBalance = useCallback(async () => {
    try {
      setLoading(true);
      const tokenBalanceInfo = await getAccountTokenBalance({
        client,
        accountId: config.accountId,
      });
      setTokenBalance(tokenBalanceInfo);

      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [client]);

  useEffect(() => {
    getTokenInfo();
    getTokenBalance();
  }, [getTokenBalance, getTokenInfo]);

  return (
    <div className="rounded-lg shadow-lg border-1 border-grey-200 w-full">
      <div className="bg-gray-50 px-4 py-1 rounded-t-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl">
            {tokenInfo && `${tokenInfo.name} (${tokenInfo.symbol})`}
          </h1>
          <h1 className="text-xs text-grey-500">{config.tokenId}</h1>
        </div>
        <div className="bg-black text-white px-2 py-2 rounded-lg">
          <h1 className=" text-xs">Balance</h1>
          <h1 className=" text-xl ">{tokenBalance}</h1>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row rounded-b-lg">
        <div className="mr-2">
          <SendToken />
        </div>
        <div className="mr-2">
          <Button
            loading={loading}
            secondary
            name="Refresh"
            onClick={getTokenBalance}
          />
        </div>
      </div>
    </div>
  );
};

const Tokens = () => {
  const tokens = [{ tokenId: config.tokenId }];
  return (
    <div className="grid grid-cols-2 gap-4">
      {tokens.map((token: any) => (
        <Token key={token.tokenId} token={token} />
      ))}
    </div>
  );
};

export default Tokens;
