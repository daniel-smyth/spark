import useSWR from "swr";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { fetchGetJSON } from "../lib/stripe/utils/api-helpers";
import PrintObject from "../components/stripe/PrintObject";
import { useState } from "react";

const ResultPage: NextPage = () => {
  const router = useRouter();
  const [info, setInfo] = useState<string[]>();
  const [layers, setLayers] = useState<string[]>();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  if (typeof window !== "undefined" && !info) {
    const store = localStorage.getItem;
    setInfo([
      store("name")!,
      store("description")!,
      store("prefix")!,
      store("mintTo")!,
    ]);
    setLayers(JSON.parse(localStorage.getItem("layers")!));
  }

  return (
    <Box>
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
        <h3>Collection details:</h3>
        {info}
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? "loading..."} />
      </div>
    </Box>
  );
};

export default ResultPage;
