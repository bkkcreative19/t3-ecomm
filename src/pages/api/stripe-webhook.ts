import type { NextApiRequest, NextApiResponse } from "next";
// import { env } from "../../env/server.mjs";
import { prisma } from "../../server/db/client";
// import type Stripe from "stripe";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { stripe } from "../../server/stripe/client";
import { appRouter } from "../../server/trpc/router/_app";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import type Stripe from "stripe";
import { createContext } from "../../server/trpc/context";
import { buffer } from "micro";
// import {
//   handleInvoicePaid,
//   handleSubscriptionCanceled,
//   handleSubscriptionCreatedOrUpdated,
// } from "../../server/stripe/stripe-webhook-handlers";
// import { stripe } from "../../server/stripe/client";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

// const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const ctx = await createContext({ req, res });
  // const caller = appRouter.createCaller(ctx);

  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig as string,
        "whsec_cf071ab14bc785758a7c909745752ce9088bf30b915aec2bd12934666fcf805b"
      );

      // Handle the event
      switch (event.type) {
        // case "payment_intent.succeeded":

        case "checkout.session.completed":
          const obj: any = event.data.object;

          await prisma.cart.delete({
            where: {
              userId: obj.client_reference_id,
            },
          });

          await prisma.order.create({
            data: {
              total: obj.amount_total,
              user: {
                connect: {
                  id: obj.client_reference_id,
                },
              },
            },
          });
          break;
        // await caller.order.createOrder(event.data.object);
        // console.log("event");
        default:
        // Unexpected event type
      }

      // record the event in the database
      // await prisma.

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(`Webhook Error: ${(err as any).message}`);
      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
