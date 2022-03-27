/* eslint-disable import/prefer-default-export */
import {
  TokenCreateTransaction,
  TokenAssociateTransaction,
  AccountId,
} from '@hashgraph/sdk';
import moment from 'moment';
import { makeTransBytes, getPublicKeyByAccountId } from './accountServices';

export async function tokenAssociate({ account, tokenId }: any) {
  const accountId = AccountId.fromSolidityAddress(account).toString();
  const transaction = new TokenAssociateTransaction()
    .setAccountId(accountId)
    .setTokenIds([tokenId]);
  const bytes = await makeTransBytes(transaction, accountId);
  return bytes;
}

export async function createToken({ account, tokenName, tokenSymbol }: any) {
  const accountId = AccountId.fromSolidityAddress(account).toString();
  const publicKey = await getPublicKeyByAccountId(accountId);
  const transaction = new TokenCreateTransaction()
    .setTokenName(tokenName)
    .setTokenSymbol(tokenSymbol)
    .setTreasuryAccountId(accountId)
    .setExpirationTime(new Date(moment().add(3, 'months').unix()))
    .setAdminKey(publicKey)
    .setSupplyKey(publicKey);

  const bytes = await makeTransBytes(transaction, accountId);
  return bytes;
}
