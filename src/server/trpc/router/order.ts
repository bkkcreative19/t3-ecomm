import { z } from "zod";
import { trpc } from "../../../utils/trpc";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const orderRouter = router({
  createOrder: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      console.log("yay", ctx);
      // try {
      //   await ctx.prisma.order.create({
      //     data: {
      //       total: input.amount,
      //       user: {
      //         connect: {
      //           id: ctx.session?.user?.id,
      //         },
      //       },
      //     },
      //   });
      // } catch (err) {
      //   console.log(err);
      // }
    }),

  getOrders: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.order.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });

    return res;
  }),
});
