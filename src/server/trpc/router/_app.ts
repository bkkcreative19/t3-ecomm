import { router } from "../trpc";
import { authRouter } from "./auth";
import { productRouter } from "./product";
import { cartRouter } from "./cart";
import { stripeRouter } from "./stripe";
import { orderRouter } from "./order";

export const appRouter = router({
  product: productRouter,
  auth: authRouter,
  cart: cartRouter,
  stripe: stripeRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
