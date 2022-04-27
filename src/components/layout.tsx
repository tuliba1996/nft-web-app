import { ReactNode } from "react";
import { Center, Container, useColorModeValue, Text } from "@chakra-ui/react";
import Header from "./Header";
import { useAppSelector } from "../hooks";

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div>
      <Header />
      <Container maxW="container.xl" padding="4">
        {props.children}
      </Container>
      <Center as="footer" bg={useColorModeValue("gray.100", "gray.700")} p={6}>
        <Text fontSize="md">first dapp by Duan Huynh - 2022</Text>
      </Center>
    </div>
  );
}
