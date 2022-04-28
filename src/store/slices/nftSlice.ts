import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNfts } from "../action/nftAction";
import { BigNumberish } from "@ethersproject/bignumber";

interface NftType {
  id: number;
  description: string;
  from: string;
  to: string;
  cost: number;
  title: string;
  timestamp: number;
  imageUrl: string;
}

interface NftState {
  loading: boolean;
  isShowModal: boolean;
  data: NftType[];
  error: string | null;
}

const initialState: NftState = {
  loading: false,
  isShowModal: false,
  data: [],
  error: null,
};

export const nftSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getNfts: (state) => {
      // state.loading = true;
    },
    mintNft: (state, action) => {
      state.isShowModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNfts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        fetchNfts.fulfilled,
        (state, action: PayloadAction<NftType[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      );
  },
});

export const { getNfts, mintNft } = nftSlice.actions;

export default nftSlice.reducer;
