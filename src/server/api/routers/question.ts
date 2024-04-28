import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        body: z.string().min(1),
        answer: z.string().min(1),
        options: z.array(z.string().min(1)).min(1),
        concept: z.string().min(1),
        category: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.create({
        data: {
          body: input.body,
          answer: input.answer,
          options: input.options,
          concept: input.concept,
          category: input.category,
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        concept: z.string().optional(),
        category: z.string().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.question.findMany({
        where: {
          concept: input.concept,
          category: input.category,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        body: z.string().min(1),
        options: z.array(z.string().min(1)).min(1),
        answer: z.string().min(1),
        category: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.update({
        where: {
          id: input.id,
        },
        data: {
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
