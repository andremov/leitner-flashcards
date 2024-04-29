import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        color: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          color: input.color,
          lastPlayedAt: new Date(0),
          currentStreak: 0,
          longestStreak: 0,
        },
      });
    }),

  getAll: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.db.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().optional(),
        color: z.string().optional(),
        lastPlayedAt: z.date().optional(),
        currentStreak: z.number().optional(),
        longestStreak: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          color: input.color,
          lastPlayedAt: input.lastPlayedAt,
          currentStreak: input.currentStreak,
          longestStreak: input.longestStreak,
        },
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
    }),

  findOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          id: input.id,
        },
        orderBy: { createdAt: "desc" },
      });
    }),
});
