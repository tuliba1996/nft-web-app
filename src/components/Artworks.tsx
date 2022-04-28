import {
  Badge,
  Box,
  Image,
  SimpleGrid,
  Center,
  Button,
} from "@chakra-ui/react";
import { LoadingComponent } from "./LoadingComponent";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { fetchNfts } from "../store/action/nftAction";
import { HamburgerIcon, MoonIcon } from "@chakra-ui/icons";

export const Artworks = () => {
  const { loading } = useAppSelector((state) => state.nft);
  const { user_address } = useAppSelector((state) => state.user);
  const nfts = useAppSelector((state) => state.nft.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNfts());
  }, []);

  const filterNft = (address?: string | null) => {
    address
      ? dispatch(fetchNfts({ user_address: address }))
      : dispatch(fetchNfts());
  };

  return (
    <SimpleGrid bg="rgb(19 24 53)" paddingBlock={10} paddingInline={40}>
      <Center>
        <Button
          leftIcon={<MoonIcon />}
          colorScheme="pink"
          variant="solid"
          marginBlock={5}
          marginInline={2}
          onClick={() => filterNft()}
        >
          Market Place
        </Button>
        <Button
          leftIcon={<HamburgerIcon />}
          colorScheme="pink"
          variant="solid"
          marginBlock={5}
          marginInline={2}
          onClick={() => filterNft(user_address)}
        >
          My NFTs Collection
        </Button>
      </Center>
      <Center>{loading ? <LoadingComponent /> : null}</Center>
      <SimpleGrid columns={4} spacing={10} pt={10}>
        {nfts.map((nft) => {
          return (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              color="white"
              key={nft.id}
              _hover={{
                boxShadow: "0px 11px 17px 7px rgba(207,40,131,0.44)",
              }}
            >
              <Image src={nft.imageUrl} alt={nft.description} />
              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    #{nft.id}
                  </Badge>
                  <Box
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {nft.cost} &bull; ETH
                  </Box>
                </Box>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {nft.title}
                </Box>

                <Box isTruncated>{nft.description}</Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </SimpleGrid>
  );
};
