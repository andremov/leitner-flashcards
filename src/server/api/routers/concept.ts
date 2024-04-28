import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const conceptRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string(),
        category: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.concept.create({
        data: {
          title: input.title,
          description: input.description,
          category: input.category,
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.concept.findMany({
        where: {
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
        description: z.string().min(1),
        category: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.concept.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
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
      return ctx.db.concept.delete({
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
      return ctx.db.concept.findFirst({
        where: {
          id: input.id,
        },
        orderBy: { createdAt: "desc" },
      });
    }),
});
