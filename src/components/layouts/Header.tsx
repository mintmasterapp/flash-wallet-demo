/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { AccountId } from '@hashgraph/sdk';
import { Pager, Button } from '../../lib';
import { useWalletConnector } from '../../utils/walletConnector';

const Header = () => {
  const { isConnected, connect, disconnect, account } = useWalletConnector();
  return (
    <header className="bg-black shadow-sm z-30">
      <Pager>
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
          <div className="flex justify-center">
            <div className="flex-none py-4 flex lg:w-60 xl:w-72">
              <h1 className="text-4xl text-white">HBD</h1>
            </div>
          </div>
        </div>
        <div className="hidden sm:block md:block lg:block xl:block">
          <div className="flex justify-between">
            <div className="flex justify-start">
              <Link to="/">
                <div className="flex-none py-3 flex mr-5">
                  <h1 className="text-lg text-white py-1 px-2  bg-gradient-to-r from-blue-700 to-green-400 rounded-lg">
                    Flash Demo
                  </h1>
                </div>
              </Link>
              <Link to="/">
                <div className="flex-none py-4 flex mr-3">
                  <h1 className="text-xl text-white">Accounts</h1>
                </div>
              </Link>
              <Link to="/tokens">
                <div className="flex-none p-4 flex mr-3">
                  <h1 className="text-xl text-white">Tokens</h1>
                </div>
              </Link>
              <Link to="/topics">
                <div className="flex-none p-4 flex mr-3">
                  <h1 className="text-xl text-white">Topics</h1>
                </div>
              </Link>
              <div className="flex-none p-4 mr-3">
                <h1 className="text-xl text-white">Files</h1>
              </div>
              <div className="flex-none p-4 flex mr-3">
                <h1 className="text-xl text-white">Transaction</h1>
              </div>
            </div>
            <div className="flex justify-start">
              {isConnected && (
                <div className="flex-none py-3 flex mr-4">
                  <div className="flex justify-around bg-white rounded-lg shadow-md">
                    <div className="flex-none flex p-2 ">
                      <p>{0}</p>
                    </div>
                    <div className="flex-none flex rounded-lg shadow-md bg-gray-200 p-2 ">
                      <p>
                        {account &&
                          AccountId.fromSolidityAddress(account).toString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {!isConnected ? (
                <div className="flex-none py-3 flex">
                  <Button name="Connect" onClick={connect} />
                </div>
              ) : (
                <div className="flex-none py-3 flex">
                  <Button name="Disconnect" onClick={disconnect} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Pager>
    </header>
  );
};

export default Header;
