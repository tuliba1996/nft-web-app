import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { dispatch, store } from "../index";

const CHAINID = 4;

declare let window: any;
export const connectWallet = createAsyncThunk(
  "user/connectWallet",
  async (param?: {}) => {
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    if (accounts.length > 0) return accounts[0];
  }
);

export const getAddress = createAsyncThunk("user/getAddress", async () => {
  if (!window.ethereum) {
    console.log("please install MetaMask");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  if (signer) {
    return await signer.getAddress();
  } else {
    connectWallet();
  }
});

export const switchNetWorkWallet = createAsyncThunk(
  "user/switchNetWorkWallet",
  async () => {
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: ethers.utils.hexValue(CHAINID) },
      ]);
      return CHAINID;
    } catch (error) {
      console.log("co loi roi", error);
    }
  }
);

export const getCurrentNetWork = createAsyncThunk(
  "user/getCurrentNetWork",
  async () => {
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    return network.chainId;
  }
);
