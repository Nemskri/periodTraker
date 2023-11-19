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
  age: number;
  tempReminder: string;
}

export interface periodDataType {
  lastPeriodDate: string;
}

const slice = createSlice({
  name: "state",
  initialState: {
    newUser: true as boolean,
    userData: {
      userName: "",
      age: 0,
      tempReminder: "",
    } as userDataType,
    periodData: {
      lastPeriodDate: null,
    } as periodDataType,
  },
  reducers: {
    setNewUser: (state, action) => {
      state.newUser = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
    deleteUserData: (state) => {
      state.userData = {
        userName: "",
        age: 0,
        tempReminder: "",
      };
      state.periodData = {
        lastPeriodDate: null,
      };
    },
    setPeriodData: (state, action) => {
      state.periodData = { ...state.periodData, ...action.payload };
    },
  },
});

const asyncConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(asyncConfig, slice.reducer);

export const { setUserData, deleteUserData, setPeriodData } = slice.actions;

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
