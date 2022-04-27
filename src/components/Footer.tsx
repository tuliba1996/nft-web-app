import { Center, Text, useColorModeValue } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Center
      as="footer"
      backgroundImage="linear-gradient(90deg, rgba(54,51,98,1) 0%, rgba(162,34,56,1) 31%, rgba(170,58,156,1) 100%)"
      p={6}
      color="white"
    >
      <Text fontSize="xl" fontWeight="bold">
        First Dapp by Duan Huynh - 2022
      </Text>
    </Center>
  );
};
