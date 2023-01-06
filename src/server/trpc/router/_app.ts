import { router } from "../trpc";
import { authRouter } from "./auth";
import { productRouter } from "./product";
import { cartRouter } from "./cart";
import { stripeRouter } from "./stripe";

export const appRouter = router({
  product: productRouter,
  auth: authRouter,
  cart: cartRouter,
  stripe: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
