/* eslint-disable import/prefer-default-export */
export const transValue = [
  'transactionFee',
  'memo',
  'contractCall',
  'contractCreateInstance',
  'contractUpdateInstance',
  'contractDeleteInstance',
  'cryptoAdjustAllowance',
  'cryptoApproveAllowance',
  'cryptoCreateAccount',
];

//         transactionFee?: (Long|null);
//         /**
//          * A memo to include the execution record; the UTF-8 encoding may be up to 100 bytes and must not
//          * include the zero byte
//          */
//         memo?: (string|null);

//         /** Calls a function of a contract instance */
//         contractCall?: (proto.IContractCallTransactionBody|null);

//         /** Creates a contract instance */
//         contractCreateInstance?: (proto.IContractCreateTransactionBody|null);

//         /** Updates a contract */
//         contractUpdateInstance?: (proto.IContractUpdateTransactionBody|null);

//         /** Delete contract and transfer remaining balance into specified account */
//         contractDeleteInstance?: (proto.IContractDeleteTransactionBody|null);

//         /** Adjusts the approved allowance for a spender to transfer the paying account's hbar or tokens. */
//         cryptoAdjustAllowance?: (proto.ICryptoAdjustAllowanceTransactionBody|null);

//         /** Adds one or more approved allowances for spenders to transfer the paying account's hbar or tokens. */
//         cryptoApproveAllowance?: (proto.ICryptoApproveAllowanceTransactionBody|null);

//         /** Create a new cryptocurrency account */
//         cryptoCreateAccount?: (proto.ICryptoCreateTransactionBody|null);

//         /** Delete a cryptocurrency account (mark as deleted, and transfer hbars out) */
//         cryptoDelete?: (proto.ICryptoDeleteTransactionBody|null);

//         /** Transfer amount between accounts */
//         cryptoTransfer?: (proto.ICryptoTransferTransactionBody|null);

//         /** Modify information such as the expiration date for an account */
//         cryptoUpdateAccount?: (proto.ICryptoUpdateTransactionBody|null);

//         /** Add bytes to the end of the contents of a file */
//         fileAppend?: (proto.IFileAppendTransactionBody|null);

//         /** Create a new file */
//         fileCreate?: (proto.IFileCreateTransactionBody|null);

//         /** Delete a file (remove contents and mark as deleted until it expires) */
//         fileDelete?: (proto.IFileDeleteTransactionBody|null);

//         /** Modify information such as the expiration date for a file */
//         fileUpdate?: (proto.IFileUpdateTransactionBody|null);

//         /** Hedera administrative deletion of a file or smart contract */
//         systemDelete?: (proto.ISystemDeleteTransactionBody|null);

//         /** To undelete an entity deleted by SystemDelete */
//         systemUndelete?: (proto.ISystemUndeleteTransactionBody|null);

//         /** Freeze the nodes */
//         freeze?: (proto.IFreezeTransactionBody|null);

//         /** Creates a topic */
//         consensusCreateTopic?: (proto.IConsensusCreateTopicTransactionBody|null);

//         /** Updates a topic */
//         consensusUpdateTopic?: (proto.IConsensusUpdateTopicTransactionBody|null);

//         /** Deletes a topic */
//         consensusDeleteTopic?: (proto.IConsensusDeleteTopicTransactionBody|null);

//         /** Submits message to a topic */
//         consensusSubmitMessage?: (proto.IConsensusSubmitMessageTransactionBody|null);

//         /** Creates a token instance */
//         tokenCreation?: (proto.ITokenCreateTransactionBody|null);

//         /** Freezes account not to be able to transact with a token */
//         tokenFreeze?: (proto.ITokenFreezeAccountTransactionBody|null);

//         /** Unfreezes account for a token */
//         tokenUnfreeze?: (proto.ITokenUnfreezeAccountTransactionBody|null);

//         /** Grants KYC to an account for a token */
//         tokenGrantKyc?: (proto.ITokenGrantKycTransactionBody|null);

//         /** Revokes KYC of an account for a token */
//         tokenRevokeKyc?: (proto.ITokenRevokeKycTransactionBody|null);

//         /** Deletes a token instance */
//         tokenDeletion?: (proto.ITokenDeleteTransactionBody|null);

//         /** Updates a token instance */
//         tokenUpdate?: (proto.ITokenUpdateTransactionBody|null);

//         /** Mints new tokens to a token's treasury account */
//         tokenMint?: (proto.ITokenMintTransactionBody|null);

//         /** Burns tokens from a token's treasury account */
//         tokenBurn?: (proto.ITokenBurnTransactionBody|null);

//         /** Wipes amount of tokens from an account */
//         tokenWipe?: (proto.ITokenWipeAccountTransactionBody|null);

//         /** Associate tokens to an account */
//         tokenAssociate?: (proto.ITokenAssociateTransactionBody|null);

//         /** Dissociate tokens from an account */
//         tokenDissociate?: (proto.ITokenDissociateTransactionBody|null);

//         /** Updates a token's custom fee schedule */
//         tokenFeeScheduleUpdate?: (proto.ITokenFeeScheduleUpdateTransactionBody|null);

//         /** Pauses the Token */
//         tokenPause?: (proto.ITokenPauseTransactionBody|null);

//         /** Unpauses the Token */
//         tokenUnpause?: (proto.ITokenUnpauseTransactionBody|null);

//         /** Marks a schedule in the network's action queue as deleted, preventing it from executing */
//         scheduleDelete?: (proto.IScheduleDeleteTransactionBody|null);
