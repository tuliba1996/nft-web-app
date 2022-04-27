import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { connectWallet } from "../action/userAction";

interface UserState {
  user_address: string | null;
}

const initialState: UserState = {
  user_address: null,
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
      });
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
