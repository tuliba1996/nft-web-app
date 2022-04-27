import {
  Button,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Image,
  useColorModeValue,
  UseImageProps,
  Badge,
  Box,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { connectWallet } from "../store/action/userAction";
import { useAppDispatch, useAppSelector } from "../hooks";
const siteTitle = "NFT App";
import ethLogo from "assets/ethlogo.png";

interface ImageType {
  src?: string | undefined;
}

export default function Header() {
  const { user_address } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onClickConnect = () => {
    dispatch(connectWallet());
  };

  console.log(ethLogo);

  return (
    <Flex
      as="header"
      bg={useColorModeValue("gray.100", "gray.900")}
      p={4}
      alignItems="center"
    >
      <LinkBox>
        <NextLink href={"/"} passHref>
          <LinkOverlay>
            <Image boxSize="50px" objectFit="cover" src={ethLogo.src} />
            <Heading size="md">{siteTitle}</Heading>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
      <Spacer />
      {user_address ? (
        <Box
          mt="1"
          maxW="sm"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {user_address}
          </Badge>
        </Box>
      ) : (
        <Button onClick={onClickConnect}>Connect to wallet</Button>
      )}
    </Flex>
  );
}
