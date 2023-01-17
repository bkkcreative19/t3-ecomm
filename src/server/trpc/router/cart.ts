import { z } from "zod";
import { trpc } from "../../../utils/trpc";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const cartRouter = router({
  createCartItem: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      async function createCartItem(cart: any) {
        await ctx.prisma.cartItem.create({
          data: {
            cart: {
              connect: {
                id: cart.id,
              },
            },
            product: {
              connect: {
                id: input.productId,
              },
            },
            quantity: 1,
          },
        });
      }

      try {
        const cart = await ctx.prisma.cart.findFirst({
          where: {
            userId: ctx.session?.user?.id,
          },
        });

        if (cart) {
          await createCartItem(cart);
        } else {
          const res: any = await ctx.prisma.cart.create({
            data: {
              total: 0,
              user: {
                connect: {
                  id: ctx.session?.user?.id,
                },
              },
            },
          });

          await createCartItem(res);
        }
      } catch (err) {}
    }),

  getCart: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.cart.findFirst({
      where: {
        userId: ctx.session?.user?.id,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        }, // All posts where authorId == 20
      },
    });
  }),

  updateCartTotal: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.cart.update({
        where: {
          userId: ctx.session?.user?.id,
        },

        data: {
          total: {
            increment: input,
          },
        },
      });
    }),

  updateQuantity: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedItem = await ctx.prisma.cartItem.update({
          where: {
            id: input.id,
          },

          data: {
            quantity: {
              increment: input.operation,
            },
          },
        });

        return updatedItem;
      } catch (err) {}
    }),

  deleteCart: protectedProcedure.mutation(async ({ ctx }) => {
    const item = await ctx.prisma.cart.findFirst({
      where: {
        userId: ctx.session?.user?.id,
      },
    });

    await ctx.prisma.cart.delete({
      where: {
        id: item?.id,
      },
    });
  }),

  deleteCartItem: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.cartItem.delete({
        where: {
          id: input,
        },
      });
    }),
});
