import type { NextPage } from "next";
import Head from "next/head";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Artworks } from "../components/Artworks";
import { Hero } from "../components/Hero";
import {
  getAddress,
  getCurrentNetWork,
  switchNetWorkWallet,
} from "../store/action/userAction";
import ethLogo from "assets/ethlogo.png";

declare let window: any;

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const currentAccount = useAppSelector((state) => state.user.user_address);
  const { chainId } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!window.ethereum) return;
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) {
      dispatch(getCurrentNetWork());
      dispatch(getAddress());
    }
  }, [currentAccount]);

  useEffect(() => {
    if (chainId !== 4) dispatch(switchNetWorkWallet());
  }, []);

  return (
    <>
      <Head>
        <title>NFT APP</title>
        <link rel="icon" href={ethLogo.src} />
      </Head>
      <Hero />
      <Artworks />
    </>
  );
};

export default Home;
