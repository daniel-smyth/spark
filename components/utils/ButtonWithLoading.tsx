import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function ButtonWithLoading(props: any) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const navigateToPage = () => {
    setLoading(true);
    router.push(props.linkDestination);
  };

  return (
    <Box>
      {isLoading ? (
        <Button {...props}>{props.loadingText}</Button>
      ) : (
        <Button
          {...props}
          onClick={props.onClick ? props.onClick : navigateToPage}
        >
          {props.buttontext}
        </Button>
      )}
    </Box>
  );
}

export default ButtonWithLoading;
