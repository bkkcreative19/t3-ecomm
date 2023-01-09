import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
// import stripe from "stripe";
import Stripe from "stripe";

export const stripeRouter = router({
  createCheckout: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15",
      });
      const lineItems = input.cartItems.map((item: any) => {
        const transformedItem = {
          price_data: {
            currency: "usd",
            product_data: {
              images: [item.product.imageURL],
              name: item.product.title,
            },
            unit_amount: item.product.price * 100,
          },
          description: item.product.description,
          quantity: item.quantity,
        };

        return transformedItem;
      });
      // stripe?.createSource
      const redirectURL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://t3-ecomm-kelb-eu3t6xonl-bkkcreative19.vercel.app";

      const session: any = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: redirectURL + "/profile",
        cancel_url: redirectURL + "?status=cancel",
        client_reference_id: ctx.session?.user?.id,
      });
      // const params: Stripe.Checkout.SessionCreateParams = {
      //   submit_type: "donate",
      //   payment_method_types: ["card"],
      //   line_items: [
      //     {
      //       name: "Custom amount donation",
      //       amount: formatAmountForStripe(amount, CURRENCY),
      //       currency: CURRENCY,
      //       quantity: 1,
      //     },
      //   ],
      //   success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      //   cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      // };
      // const checkoutSession: Stripe.Checkout.Session =
      //   await stripe?.checkout.sessions.create(params);

      return session;
    }),
});
