import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { MIN_AMOUNT, MAX_AMOUNT, CURRENCY } from "../../../lib/stripe/config";
import { formatAmountForStripe } from "../../../lib/stripe/utils/stripeHelpers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const amount: number = req.body.amount;
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error("Invalid amount.");
      }
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        line_items: [
          {
            name: "Spark3 fee",
            amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/stripe/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/collection/getstarted`,
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, message: "Failed to fetch Stripe checkout." });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
