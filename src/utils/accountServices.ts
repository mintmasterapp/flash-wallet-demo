/* eslint-disable no-underscore-dangle */
import {
  PrivateKey,
  AccountCreateTransaction,
  Client,
  TransferTransaction,
  AccountBalanceQuery,
  Hbar,
  AccountId,
  TransactionId,
  Transaction,
} from '@hashgraph/sdk';
import config from './config';

// import { associateTokenToAccount } from './tokenService';

export async function getClient({
  accountId,
  privateKey,
}: {
  accountId: string;
  privateKey: string;
}) {
  const client = Client.forTestnet();
  client.setOperator(accountId, privateKey);
  return client;
}

export const makeTransBytes = async (trans: any, accountId: string) => {
  const transId = TransactionId.generate(accountId);
  trans.setTransactionId(transId);
  trans.setNodeAccountIds([new AccountId(3)]);
  await trans.freeze();
  return Buffer.from(trans.toBytes()).toString('hex');
};

export async function sendHBars({
  accountId,
  privateKey,
  amount,
  destinationAccountId,
}: {
  accountId: string;
  privateKey: string;
  amount: number;
  destinationAccountId: string;
}) {
  const client = Client.forTestnet();
  client.setOperator(accountId, privateKey);
  const transaction = new TransferTransaction()
    .addHbarTransfer(accountId, new Hbar(-amount))
    .addHbarTransfer(destinationAccountId, new Hbar(amount));
  const txResponse = await transaction.execute(client);
  const receipt = await txResponse.getReceipt(client);
  const transactionStatus = receipt.status;
  return transactionStatus.toString();
}

export async function getAccountBalance({
  accountId,
  privateKey,
}: {
  accountId: string;
  privateKey: string;
}) {
  const client = Client.forTestnet();
  client.setOperator(accountId, privateKey);
  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

  return {
    hbarBalance: accountBalance.hbars.toString(),
    tokenBal: accountBalance.tokens?.get(config.tokenId)?.toNumber(),
  };
}

// export const transactionsTypes: any = {
//   cryptoCreateAccount: {
//     name: 'Create Account',
//     details: 'Create a new cryptocurrency account',
//   },
// };

// function intersect(o1: any, o2: any) {
//   return Object.keys(o1).filter((k) => k in o2);
// }

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

// async makeBytes(trans: Transaction, signingAcctId: string) {

//   let transId = TransactionId.generate(signingAcctId)
//   trans.setTransactionId(transId);
//   trans.setNodeAccountIds([new AccountId(3)]);

//   await trans.freeze();

//   let transBytes = trans.toBytes();

//   return transBytes;
// }
