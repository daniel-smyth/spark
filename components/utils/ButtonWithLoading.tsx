import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function ButtonWithLoading(props: any) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const navigateToPage = () => {
    if (props.linkdestination !== "#") {
      setLoading(true);
      router.push(props.linkdestination);
    }
  };

  return (
    <Box>
      {isLoading ? (
        <Button isLoading {...props}>
          {props.loadingText}
        </Button>
      ) : (
        <Button
          disabled={props.isDisabled ? true : false}
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
