import { router } from "../trpc";
import { authRouter } from "./auth";
import { productRouter } from "./product";
import { cartRouter } from "./cart";

export const appRouter = router({
  product: productRouter,
  auth: authRouter,
  cart: cartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
