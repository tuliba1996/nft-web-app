import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  connectWallet,
  getAddress,
  getCurrentNetWork,
  switchNetWorkWallet,
} from "../action/userAction";

interface UserState {
  user_address: string | null;
  chainId: number | null;
}

const initialState: UserState = {
  user_address: null,
  chainId: null, // Default chain Rinkeby test net
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      // state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.pending, (state, action) => {})
      .addCase(connectWallet.fulfilled, (state, action: PayloadAction<any>) => {
        state.user_address = action.payload;
      })
      .addCase(getAddress.fulfilled, (state, action: PayloadAction<any>) => {
        state.user_address = action.payload;
      })
      .addCase(
        getCurrentNetWork.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.chainId = action.payload;
        }
      )
      .addCase(
        switchNetWorkWallet.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.chainId = action.payload;
        }
      );
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
