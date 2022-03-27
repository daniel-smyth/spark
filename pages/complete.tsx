import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { fetchGetJSON } from "../lib/stripe/utils/api-helpers";

function Complete() {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );
  if (error) return <div>failed to load</div>;

  if (data?.payment_intent?.status) {
    localStorage.setItem("status", "true");
    return <div>Paid</div>;
  }

  return <div>Complete</div>;
}

export default Complete;
