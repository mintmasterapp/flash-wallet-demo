import { forEach } from 'lodash';
import Long from 'long';

const parseAccountId = (accountID: any) => {
  const accountNum = Long.fromValue(accountID.accountNum).toNumber();
  const realmNum = Long.fromValue(accountID.realmNum).toNumber();
  const shardNum = Long.fromValue(accountID.shardNum).toNumber();

  return `${shardNum}.${realmNum}.${accountNum}`;
};
const parseTokenId = (accountID: any) => {
  const tokenNum = Long.fromValue(accountID.tokenNum).toNumber();
  const realmNum = Long.fromValue(accountID.realmNum).toNumber();
  const shardNum = Long.fromValue(accountID.shardNum).toNumber();

  return `${shardNum}.${realmNum}.${tokenNum}`;
};

export const parseCreateAccount = () => {};

export const parseCryptoTransfer = (transfer: any) => {
  const hbars: any = [];
  const tokens: any = [];
  const nfts: any = [];
  const hbarTransfer = transfer.transfers.accountAmounts;
  const { tokenTransfers } = transfer;

  forEach(hbarTransfer, (item) => {
    hbars.push({
      accountId: parseAccountId(item.accountID),
      amount: Long.fromValue(item.amount).toNumber(),
    });
  });

  forEach(tokenTransfers, (item) => {
    const accounts: any = [];
    forEach(item.nftTransfers, (item3) => {
      nfts.push({
        tokenId: parseTokenId(item.token),
        senderAccountID: parseAccountId(item3.senderAccountID),
        receiverAccountID: parseAccountId(item3.receiverAccountID),
        serialNumber: Long.fromValue(item3.serialNumber).toNumber(),
      });
    });
    forEach(item.transfers, (item2) => {
      accounts.push({
        accountId: parseAccountId(item2.accountID),
        amount: Long.fromValue(item2.amount).toNumber(),
      });
    });
    if (accounts.length !== 0) {
      tokens.push({
        tokenId: parseTokenId(item.token),
        accounts,
      });
    }
  });

  console.log('hbars', hbars, tokens, nfts);
};
