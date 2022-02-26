import React from "react";
import { Container } from "@chakra-ui/react";
import { buildSetup, startCreating } from "../../lib/artengine/main";
import cookie from "cookie";

function CreateActCollection() {
  return <Container></Container>;
}

export default CreateActCollection;

export async function getServerSideProps(context: any) {
  // Get the art collection size from the cookies. This is set
  // in "web3/createartcollection.tsx" using useCookie().
  const cookieObj = cookie.parse(context.req.headers.cookie);
  const artCollectionSize = cookieObj.artcollectionsize;

  // Hashlips art engine.
  // Creates build folders.
  buildSetup();

  // Creates art.
  startCreating(artCollectionSize);

  return {
    props: {},
  };
}
