/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import type { Stripe } from "@stripe/stripe-js";
import Stripe from "stripe";

let stripePromise: any;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = new Stripe(
      "sk_test_51KsrI3Lojhc6RaUL1tjZKe79wdB90glSQikDS3FnhsSYpLFVYcXQGpTC2mHG15X0sFmjqSigyDeZpOxV7A8qCwvi00Sqd8fjmO",
      {
        apiVersion: "2022-11-15",
      }
    );
  }
  return stripePromise;
};

export default getStripe;
