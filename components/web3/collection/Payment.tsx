import React, { useEffect, useState } from "react";
import getStripe from "../../../lib/stripe/utils/get-stripejs";
import { Stack, Heading, Button } from "@chakra-ui/react";
import { fetchPostJSON } from "../../../lib/stripe/utils/api-helpers";

interface PaymentProps {
  setState: any;
}

function Payment(props: PaymentProps) {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      checkStatus();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let count = 0;
  function checkStatus() {
    const status = localStorage.getItem("status");
    if (status === "true") {
      setPaid(true);
      localStorage.setItem("status", "unpaid");
      props.setState(true);
    } else {
      console.log("Not paid " + count + " seconds in.");
      count++;
    }
  }

  const handleClick = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("status", "false");
      window.open("/startpayment", "_blank")!.focus();
    }
  };

  return (
    <Stack spacing={4}>
      <Heading>Payment</Heading>
      {paid ? <Heading>Paid</Heading> : <Heading>Not Paid</Heading>}
      <Button size="md" variant="solid" onClick={handleClick}>
        Pay
      </Button>
    </Stack>
  );
}

export default Payment;
