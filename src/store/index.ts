import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import nftSlice from "./slices/nftSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    nft: nftSlice,
  },
});

export const { dispatch } = store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
