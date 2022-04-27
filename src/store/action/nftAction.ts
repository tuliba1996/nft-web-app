import { createAsyncThunk } from "@reduxjs/toolkit";
import { BigNumber, Contract, ethers } from "ethers";
import Adulam from "../../abis/Adulam.json";

declare let window: any;

const BASE_URI =
  "https://bafybeidfpvjszubegtoomoknmc7zcqnay7noteadbwxktw46guhdeqohrm.ipfs.infura-ipfs.io/";

const structuredNfts = (nfts: any) => {
  // const web3 = window.web3;
  return nfts
    .map((nft: any) => ({
      id: BigNumber.from(nft.id).toNumber(),
      to: nft.to,
      from: nft.from,
      cost: ethers.utils.formatEther(nft.cost),
      title: nft.title,
      description: nft.description,
      timestamp: BigNumber.from(nft.timestamp).toNumber(),
      imageUrl: BASE_URI + nft.id + ".webp",
    }))
    .reverse();
};

export const fetchNfts = createAsyncThunk("nft/getNfts", async (param?: {}) => {
  if (!window.ethereum) {
    console.log("please install MetaMask");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const erc20: Contract = new ethers.Contract(
    "0x20f504f9e51b0c8e9aa6816dc9da3b26ee93ea25",
    Adulam.abi,
    provider
  );

  const rawNFTs = await erc20.getAllNFTs();
  return structuredNfts(rawNFTs);
});
