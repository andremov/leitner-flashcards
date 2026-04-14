import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dailyWordRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        word: z.string().min(1),
        description: z.string().min(1),
        translation: z.string().min(1),
        category: z.string().min(1),
        assignedDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.dailyWord.create({
        data: {
          word: input.word,
          description: input.description,
          translation: input.translation,
          category: input.category,
          assignedDate: input.assignedDate,
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        beginDate: z.date().optional(),
        endDate: z.date().optional(),
      }),
    )
    .query(({ input, ctx }) => {
      if (input.beginDate && input.endDate) {
        return ctx.db.dailyWord.findMany({
          where: {
            assignedDate: {
              gte: input.beginDate,
              lte: input.endDate,
            },
          },
        });
      }

      return ctx.db.dailyWord.findMany({
        orderBy: { createdAt: "desc" },
      });
    }),

  // update: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.string().min(1),
  //       name: z.string().optional(),
  //       color: z.string().optional(),
  //       lastPlayedAt: z.date().optional(),
  //       currentStreak: z.number().optional(),
  //       longestStreak: z.number().optional(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.user.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         name: input.name,
  //         color: input.color,
  //         lastPlayedAt: input.lastPlayedAt,
  //         currentStreak: input.currentStreak,
  //         longestStreak: input.longestStreak,
  //       },
  //     });
  //   }),

  // delete: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.string().min(1),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.user.delete({
  //       where: {
  //         id: input.id,
  //       },
  //     });
  //   }),

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
