import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const cartRouter = router({
  createCart: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      try {
        // await ctx.prisma.cart.create({
        //     data: {
        // total: 0,
        // userId: ctx.session?.user?.id,
        // user: ctx.session?.user?
        //   },
        // });

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

  addQuantity: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      try {
        const updatedItem = await ctx.prisma.cartItem.update({
          where: {
            id: input,
          },

          data: {
            quantity: {
              increment: 1,
            },
          },
        });

        return updatedItem;
      } catch (err) {}
    }),

  minusQuantity: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      try {
        const item = await ctx.prisma.cartItem.findFirst({
          where: {
            id: input,
          },
        });

        if (item?.quantity === 1) {
          console.log("de");
          await ctx.prisma.cartItem.delete({
            where: {
              id: input,
            },
          });
          return;
        }

        console.log("yay");
        const updatedItem = await ctx.prisma.cartItem.update({
          where: {
            id: input,
          },

          data: {
            quantity: {
              decrement: 1,
            },
          },
        });

        return updatedItem;
      } catch (err) {}
    }),

  deleteCart: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.cart.findFirst({
        where: {
          id: input,
        },
      });

      await ctx.prisma.cart.delete({
        where: {
          id: item?.id,
        },
      });
    }),
});
