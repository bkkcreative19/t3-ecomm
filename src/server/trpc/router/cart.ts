import { z } from "zod";
import { trpc } from "../../../utils/trpc";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const cartRouter = router({
  createCart: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      try {
        const cart = await ctx.prisma.cart.findFirst({
          where: {
            userId: ctx.session?.user?.id,
          },
        });

        if (cart) {
          return;
        }

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

        return res;
      } catch (err) {
        console.log(err);
      }
    }),

  createCartItem: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      try {
        const cart = await ctx.prisma.cart.findFirst({
          where: {
            userId: ctx.session?.user?.id,
          },
        });

        console.log(cart);

        if (cart) {
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

          await ctx.prisma.cartItem.create({
            data: {
              cart: {
                connect: {
                  id: res.id,
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
      } catch (err) {}
    }),

  getCart: publicProcedure.query(async ({ ctx }) => {
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

  updateCartTotal: publicProcedure
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

  updateQuantity: publicProcedure
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

  deleteCart: publicProcedure.mutation(async ({ ctx }) => {
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

  deleteCartItem: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.cartItem.delete({
        where: {
          id: input,
        },
      });
    }),
});
