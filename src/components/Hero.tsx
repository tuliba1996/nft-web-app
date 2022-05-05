import { Button, Center, Text } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { mintNFT } from "../store/action/nftAction";
import { useAppSelector } from "../hooks";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AlertComponent } from "./AlertComponent";

declare let window: any;

export const Hero = () => {
  const { user_address } = useAppSelector((state) => state.user);
  const { data } = useAppSelector((state) => state.nft);
  const [isInstallWallet, setIsInstallWallet] = useState(true);
  const handleOnClick = () => {
    if (isInstallWallet) {
      mintNFT(data.length + 1, user_address);
    } else {
      alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      setIsInstallWallet(false);
    }
  });

  return (
    <Center
      backgroundImage="url(https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png)"
      p={6}
      color="white"
      className="hero-container"
    >
      <Text fontSize="5xl" fontWeight="extrabold">
        A.I Arts NFTs Collection
      </Text>
      <Text>Mint and collect the hottest NFTs around.</Text>
      <Button
        leftIcon={<DownloadIcon />}
        colorScheme="pink"
        variant="solid"
        marginBlock={5}
        onClick={handleOnClick}
        isDisabled={!isInstallWallet}
      >
        Mint Now
      </Button>
      <AlertComponent />
    </Center>
  );
};
