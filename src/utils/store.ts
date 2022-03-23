/* eslint-disable no-param-reassign */
import { createStore, action, Action, persist, Thunk, thunk } from 'easy-peasy';

export type Accounts = {
  [x: string]: any;
};

export type AccountsModel = {
  accounts: Accounts[];
  addAccounts: Action<AccountsModel, Accounts>;
  updateAccounts: Action<AccountsModel, Accounts[]>;
  refreshAccounts: Thunk<AccountsModel, Accounts[]>;
};

const accountModal: AccountsModel = {
  accounts: [],
  addAccounts: action((state, payload) => {
    state.accounts.push(payload);
  }),
  updateAccounts: action((state, payload) => {
    state.accounts = payload;
  }),
  refreshAccounts: thunk(async (actions, payload) => {
    actions.updateAccounts(payload);
  }),
};

export type StoreModal = {
  accountModal: AccountsModel;
};

const store = createStore<StoreModal>({
  accountModal: persist(accountModal),
});

export default store;
