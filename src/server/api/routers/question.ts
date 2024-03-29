import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        body: z.string().min(1),
        answer: z.number(),
        options: z.array(z.string().min(1)).min(1),
        flashcard: z.string().min(1),
        category: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.create({
        data: {
          title: input.title,
          body: input.body,
          answer: input.answer,
          options: input.options,
          flashcard: input.flashcard,
          category: input.category,
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        flashcard: z.string().optional(),
        category: z.string().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.question.findMany({
        where: {
          flashcard: input.flashcard,
          category: input.category,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        body: z.string().min(1),
        options: z.array(z.string().min(1)).min(1),
        answer: z.number(),
        category: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          body: input.body,
          options: input.options,
          answer: input.answer,
          category: input.category,
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
      return ctx.db.question.delete({
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
      return ctx.db.question.findFirst({
        where: {
          id: input.id,
        },
        orderBy: { createdAt: "desc" },
      });
    }),
});
