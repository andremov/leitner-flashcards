import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionTemplateRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        body: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.questionTemplate.create({
        data: {
          body: input.body,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.questionTemplate.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.questionTemplate.update({
        where: {
          id: input.id,
        },
        data: {
          body: input.body,
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
      return ctx.db.questionTemplate.delete({
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
      return ctx.db.questionTemplate.findFirst({
        where: {
          id: input.id,
        },
        orderBy: { createdAt: "desc" },
      });
    }),
});
