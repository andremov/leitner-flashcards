import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dailyWordExampleRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        wordId: z.string().min(1),
        sentence: z.string().min(1),
        translation: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.dailyWordExample.create({
        data: {
          wordId: input.wordId,
          sentence: input.sentence,
          translation: input.translation,
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        wordId: z.string().optional(),
      }),
    )
    .query(({ input, ctx }) => {
      if (input.wordId) {
        return ctx.db.dailyWordExample.findMany({
          where: {
            wordId: input.wordId,
          },
        });
      }

      return ctx.db.dailyWordExample.findMany({
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
