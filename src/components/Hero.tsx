import { Button, Center, Text } from "@chakra-ui/react";
import { HamburgerIcon, DownloadIcon } from "@chakra-ui/icons";

export const Hero = () => {
  return (
    <Center
      backgroundImage="url(https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png)"
      p={6}
      color="white"
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
      >
        Mint Now
      </Button>
      <Button
        leftIcon={<HamburgerIcon />}
        colorScheme="pink"
        variant="solid"
        marginBlock={5}
      >
        My NFTs Collection
      </Button>
    </Center>
  );
};
