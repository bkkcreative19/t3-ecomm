import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51KsrI3Lojhc6RaUL1tjZKe79wdB90glSQikDS3FnhsSYpLFVYcXQGpTC2mHG15X0sFmjqSigyDeZpOxV7A8qCwvi00Sqd8fjmO",
  {
    apiVersion: "2022-11-15",
  }
);
