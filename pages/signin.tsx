import { Container } from "@chakra-ui/react";
import React from "react";
import ArtCollectionForm from "../components/ArtCollectionForm";
import CreateWalletWithEmail from "../components/CreateWalletWithEmail";

function SignIn() {
  return (
    <Container>
      <CreateWalletWithEmail />
    </Container>
  );
}

export default SignIn;
