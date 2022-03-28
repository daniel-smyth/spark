import React, { useEffect } from "react";
import { Stack, Heading, Button } from "@chakra-ui/react";

interface Props {
  amount: number;
  paid: boolean;
  paidState: any;
}

function Stripe(props: Props) {
  useEffect(() => {
    const interval = setInterval(() => check(), 1000);
    return () => clearInterval(interval);
  }, []);

  let count = 0;
  function check() {
    if (localStorage.getItem("status") === "true") {
      props.paidState(true);
      localStorage.removeItem("status");
    } else {
      console.log("Not paid: " + count + " seconds.");
      count++;
    }
  }

  const handleClick = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("status", "false");
      localStorage.setItem("amount", `${props.amount}`);
      window.open("/stripe/start", "_blank")!.focus();
    }
  };

  return (
    <Stack spacing={4}>
      <Heading>Payment</Heading>
      {props.paid ? <Heading>Paid</Heading> : <Heading>Not Paid</Heading>}
      <Button size="md" variant="solid" onClick={handleClick}>
        Pay
      </Button>
    </Stack>
  );
}

export default Stripe;
