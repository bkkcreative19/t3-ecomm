import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const productRouter = router({
  getProducts: publicProcedure
    .input(
      z.object({
        prices: z.array(z.string()),
        brands: z.array(z.string()),
        search: z.string(),
        sortBy: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const yay = input.prices
        .map((item) =>
          item
            .split("-")
            .map((item) => Number(item.slice(1).replaceAll(",", "")))
        )
        .flat()
        .sort();
      return await ctx.prisma.product.findMany({
        orderBy: {
          price: input.sortBy === "asc" ? "asc" : "desc",
        },
        where: {
          category: input.brands[0]?.toLowerCase(),
          price: { gte: yay[0], lte: yay[yay.length - 1] },
        },
      });
    }),

  getProductByTitle: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findFirst({
        where: {
          title: input,
        },
      });
    }),
});
