import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

const ResultPage: NextPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null
  );

  return (
    <Box>
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
      </div>
    </Box>
  );
};

export default ResultPage;
