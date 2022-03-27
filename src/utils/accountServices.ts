/* eslint-disable no-underscore-dangle */
import {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  TransferTransaction,
  Hbar,
  AccountId,
  TransactionId,
  Transaction,
  PublicKey,
  AccountBalanceQuery,
} from '@hashgraph/sdk';
import axios from 'axios';
import Long from 'long';

const getHederaClient = (chainId: number) => {
  if (chainId === 1) {
    const client = Client.forMainnet();
    return client;
  }
  if (chainId === 3) {
    const client = Client.forPreviewnet();
    return client;
  }
  const client = Client.forTestnet();
  return client;
};

export const makeTransBytes = async (trans: any, accountId: string) => {
  const transId = TransactionId.generate(accountId);
  trans.setTransactionId(transId);
  trans.setNodeAccountIds([new AccountId(3)]);
  await trans.freeze();
  const data = Transaction.fromBytes(
    trans.toBytes(),
  )._getScheduledTransactionBody();
  console.log('_getScheduledTransactionBody', data);
  return Buffer.from(trans.toBytes()).toString('hex');
};

export async function getAccountBalance(accountId: string, chainId: number) {
  const query = new AccountBalanceQuery().setAccountId(accountId);
  const accountBalance = await query.execute(getHederaClient(chainId));
  return parseFloat(accountBalance.hbars.toString()).toFixed(2);
}

export async function getPublicKeyByAccountId(accountId: string) {
  const { data }: any = await axios(
    `https://testnet.mirrornode.hedera.com/api/v1/accounts/${accountId}`,
  );
  console.log(data);
  const key = await PublicKey.fromString(data.key.key);
  return key;
}

export async function createAccount(account: string, balance: string) {
  const newAccountPrivateKey = PrivateKey.generate();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;
  const newAccountTransaction = new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(new Hbar(balance));
  const bytes = await makeTransBytes(
    newAccountTransaction,
    AccountId.fromSolidityAddress(account).toString(),
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  const data = Transaction.fromBytes(
    newAccountTransaction.toBytes(),
  )._getScheduledTransactionBody();
  console.log('data', data.transactionFee?.toString(), balance);

  return {
    transByte: bytes,
    privateKey: newAccountPrivateKey?.toString(),
    publicKey: newAccountPrivateKey.publicKey?.toString(),
  };
}

export async function senHbar(
  sender: string,
  receiver: string,
  amount: string,
) {
  const senderAccountId = AccountId.fromSolidityAddress(sender).toString();
  const newAccountTransaction = new TransferTransaction()
    .addHbarTransfer(senderAccountId, new Hbar(-amount))
    .addHbarTransfer(receiver, new Hbar(amount));
  const bytes = await makeTransBytes(newAccountTransaction, senderAccountId);
  return bytes;
}
