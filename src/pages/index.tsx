import type { NextPage } from "next";
import Head from "next/head";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Artworks } from "../components/Artworks";
import { Hero } from "../components/Hero";
import { getAddress } from "../store/action/userAction";
import { AlertComponent } from "../components/AlertComponent";

declare let window: any;

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const currentAccount = useAppSelector((state) => state.user.user_address);

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) {
      dispatch(getAddress());
    }
    if (!window.ethereum) return;
  }, [currentAccount]);

  return (
    <>
      <Head>
        <title>My DAPP</title>
      </Head>
      <Hero />
      <Artworks />
    </>
  );
};

export default Home;
