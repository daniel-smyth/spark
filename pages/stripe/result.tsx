import { Stack, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { fetchGetJSON } from "../../lib/stripe/utils/api-helpers";
import { useRouter } from "next/router";
import Spark3Black from "../../components/logo/spark3black";
import useSWR from "swr";
import { CheckIcon } from "@chakra-ui/icons";

function Complete() {
  const router = useRouter();
  const [text, setText] = useState("Processing");
  const [status, setStatus] = useState(false);

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );
  if (error) return <div>failed to load</div>;

  if (data?.payment_intent?.status && text == "Processing") {
    localStorage.setItem("status", "true");
    setText("Complete");
    setStatus(true);
  }

  return (
    <Stack
      minH={"50vh"}
      spacing={7}
      py={10}
      alignItems="center"
      justifyContent={"center"}
    >
      {!status ? (
        <>
          <Spinner color={"blue.500"} />
          <Stack alignItems="center">
            <Text size="lg">{text}</Text>
          </Stack>
          <Spark3Black width={60} />
        </>
      ) : (
        <>
          <CheckIcon color={"blue.500"} />
          <Stack alignItems="center">
            <Text size="lg">{text}</Text>
            {text == "Complete" ? (
              <Text size="lg">Return to minting page</Text>
            ) : null}
          </Stack>
          <Spark3Black width={60} />
        </>
      )}
    </Stack>
  );
}

export default Complete;
