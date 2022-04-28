import { createAsyncThunk } from "@reduxjs/toolkit";
import { BigNumber, Contract, ethers } from "ethers";
import Adulam from "../../abis/Adulam.json";
import { store } from "../index";
import { mintNft } from "../slices/nftSlice";

declare let window: any;

const BASE_URI =
  "https://bafybeidfpvjszubegtoomoknmc7zcqnay7noteadbwxktw46guhdeqohrm.ipfs.infura-ipfs.io/";

const structuredNfts = (nfts: any) => {
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

interface filerNftType {
  user_address: string;
}

export const fetchNfts = createAsyncThunk(
  "nft/getNfts",
  async (param?: filerNftType | null) => {
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
    if (param?.user_address) {
      return structuredNfts(rawNFTs).filter((nft: any) => {
        return nft.from === param.user_address;
      });
    }
    return structuredNfts(rawNFTs);
  }
);

const payForArt = async (art: any) => {
  const { dispatch } = store;
  try {
    const buyer = art.buyer;
    const title = art.title;
    const description = art.description;
    const cost = ethers.utils.parseEther("0.01");

    // setLoadingMsg("NFT minting in progress...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20: Contract = new ethers.Contract(
      "0x20f504f9e51b0c8e9aa6816dc9da3b26ee93ea25",
      Adulam.abi,
      signer
    );

    const tx = {
      from: buyer,
      value: ethers.utils.parseEther("0.01"),
      gasLimit: 1000000,
    };

    await erc20.payToMint(title, description, tx);

    return true;
  } catch (error) {
    console.error("loi me roi", error);
    dispatch(mintNft(false));
  }
};

export const mintNFT = async (
  nextIndexToken: number,
  current_address: string | null
) => {
  const { dispatch } = store;
  dispatch(mintNft(true));
  fetch(BASE_URI + nextIndexToken + ".json")
    .then((data) => data.json())
    .then((res) => {
      payForArt({ ...res, buyer: current_address }).then((result) => {
        if (result) {
          console.log("Mint success...");
        }
      });
    })
    .catch((error) => {});
};
