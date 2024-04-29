import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userQuestionHistoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        rightCount: z.number(),
        wrongCount: z.number(),
        leitnerBox: z.number(),
        due: z.date(),
        user: z.string().min(1),
        question: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userQuestionHistory.create({
        data: {
          rightCount: input.rightCount,
          wrongCount: input.wrongCount,
          leitnerBox: input.leitnerBox,
          due: input.due,
          user: input.user,
          question: input.question,
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        user: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.userQuestionHistory.findMany({
        where: {
          user: input.user,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        rightCount: z.number().optional(),
        wrongCount: z.number().optional(),
        leitnerBox: z.number().optional(),
        due: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userQuestionHistory.update({
        where: {
          id: input.id,
        },
        data: {
          rightCount: input.rightCount,
          wrongCount: input.wrongCount,
          leitnerBox: input.leitnerBox,
          due: input.due,
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
      return ctx.db.userQuestionHistory.delete({
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
      return ctx.db.userQuestionHistory.findFirst({
        where: {
          id: input.id,
        },
        orderBy: { createdAt: "desc" },
      });
    }),
});
