import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export interface userDataType {
  userName: string;
  bankAccount: string;
  currentBalance: number;
  income: number;
}

const slice = createSlice({
  name: "state",
  initialState: {
    pin: null as string | null,
    newUser: true as boolean,
    userData: {} as userDataType,
  },
  reducers: {
    storePin: (state, action) => {
      state.pin = action.payload;
    },
    clearPin: (state) => {
      state.pin = null;
    },
    killStore: (state) => {
      state.pin = null;
      state.newUser = true;
      state.userData = {
        userName: "",
        bankAccount: "",
        currentBalance: 0,
        income: 0,
      };
    },
    setNewuser: (state, action) => {
      state.newUser = action.payload;
    },
    UserName: (state, action) => {
      state.userData.userName = action.payload;
    },
    BankAccount: (state, action) => {
      state.userData.bankAccount = action.payload;
    },
    CurrentBalance: (state, action) => {
      state.userData.currentBalance = action.payload;
    },
    Income: (state, action) => {
      state.userData.income = action.payload;
    },
  },
});

const asyncConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(asyncConfig, slice.reducer);

export const {
  storePin,
  killStore,
  clearPin,
  setNewuser,
  UserName,
  BankAccount,
  CurrentBalance,
  Income,
} = slice.actions;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
