import { Badge, Box, Image, SimpleGrid } from "@chakra-ui/react";
import { LoadingComponent } from "./LoadingComponent";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { fetchNfts } from "../store/action/nftAction";

export const Artworks = () => {
  const { loading } = useAppSelector((state) => state.nft);
  const nfts = useAppSelector((state) => state.nft.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNfts());
  }, []);

  return (
    <SimpleGrid columns={4} spacing={10}>
      {loading ? (
        <LoadingComponent />
      ) : (
        nfts.map((nft) => {
          return (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              key={nft.id}
              _hover={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
        })
      )}
    </SimpleGrid>
  );
};
