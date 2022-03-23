import {
  TokenCreateTransaction,
  Hbar,
  TokenInfoQuery,
  TransferTransaction,
  PrivateKey,
  AccountBalanceQuery,
  TokenAssociateTransaction,
} from '@hashgraph/sdk';
import config from './config';

export async function createToken({
  client,
  tokenName,
  tokenSymbol,
  treasuryAccountId,
}: any) {
  const privateKey = await PrivateKey.generate();
  console.log('privateKey', privateKey?.toString());
  const transactions = await new TokenCreateTransaction()
    .setTokenName(tokenName)
    .setTokenSymbol(tokenSymbol)
    .setDecimals(10)
    .setTreasuryAccountId(treasuryAccountId)
    .setSupplyKey(privateKey.publicKey)
    .setInitialSupply(10000000000)
    .setMaxTransactionFee(new Hbar(30));

  console.log('transactions', transactions);
  await transactions.signWithOperator(client);
  const response = await transactions.execute(client);
  const transactionReceipt = await response.getReceipt(client);
  console.log('transactionReceipt', transactionReceipt.tokenId?.toString());
}

interface GetTokenProps {
  client: any;
  tokenId: string;
}

export async function tokenGetInfo({ client, tokenId }: GetTokenProps) {
  let tokenResponse = null;
  try {
    const info = await new TokenInfoQuery().setTokenId(tokenId).execute(client);
    tokenResponse = info;
  } catch (err) {
    console.log(err.message);
  }

  return tokenResponse;
}

export async function sendRewards({
  client,
  destinationAccount,
  tokenCount = 1,
}: any) {
  const transaction = await new TransferTransaction()
    .addTokenTransfer(config.tokenId, config.accountId, -tokenCount)
    .addTokenTransfer(config.tokenId, destinationAccount, tokenCount)
    .freezeWith(client);

  const signTx = await transaction.sign(
    PrivateKey.fromString(config.privateKey),
  );
  const txResponse = await signTx.execute(client);
  const receipt = await txResponse.getReceipt(client);
  const transactionStatus = receipt.status;

  return {
    status: transactionStatus.toString(),
  };
}

export async function getAccountTokenBalance({ client, accountId }: any) {
  const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
  const tokenBalance = await balanceQuery.execute(client);

  const tokenBal = tokenBalance.tokens?.get(config.tokenId)?.toNumber();

  return tokenBal;
}

export async function associateTokenToAccount({
  client,
  accountId,
  privateKey,
}: any) {
  const transaction = await new TokenAssociateTransaction()
    .setAccountId(accountId)
    .setTokenIds([config.tokenId])
    .freezeWith(client);

  const signTx = await transaction.sign(PrivateKey.fromString(privateKey));

  const txResponse = await signTx.execute(client);

  const receipt = await txResponse.getReceipt(client);
  const transactionStatus = receipt.status;

  return { success: transactionStatus.toString() };
}
