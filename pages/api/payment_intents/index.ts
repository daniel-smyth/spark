import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
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
    const { amount }: { amount: number } = req.body;
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error("Invalid amount.");
      }
      // Create PaymentIntent from body params.
      const params: Stripe.PaymentIntentCreateParams = {
        payment_method_types: ["card"],
        amount: formatAmountForStripe(amount, CURRENCY),
        currency: CURRENCY,
      };
      const payment_intent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create(params);

      res.status(200).json(payment_intent);
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, message: "Error fetching payment intent." });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
