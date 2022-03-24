import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetchGetJSON } from "../lib/stripe/utils/apihelpers";

const ResultPage: NextPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  console.log(data);
  console.log(error);

  if (error) return <div>failed to load</div>;

  return (
    <Box>
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? "loading..."} />
      </div>
    </Box>
  );
};

export default ResultPage;

import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  content: object;
};

const PrintObject = ({ content }: Props) => {
  const formattedContent: string = JSON.stringify(content, null, 2);
  return <pre>{formattedContent}</pre>;
};
