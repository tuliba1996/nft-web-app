import type { NextPage } from "next";
import Head from "next/head";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Adulam from "abis/Adulam.json";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Artworks } from "../components/Artworks";
import { Hero } from "../components/Hero";

declare let window: any;

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string | undefined>();
  const [chainId, setChainId] = useState<string>("4");
  const [chainname, setChainName] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const currentAccount = useAppSelector((state) => state.user.user_address);

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(currentAccount).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });

    provider.getNetwork().then((result) => {
      setChainId(result.chainId.toString());
      setChainName(result.name);
    });
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
