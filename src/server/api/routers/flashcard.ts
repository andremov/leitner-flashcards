import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const flashcardRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string(),
        category: z.string().min(1),
        cardset: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.flashcard.create({
        data: {
          title: input.title,
          description: input.description,
          category: input.category,
          cardset: input.cardset,
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        cardset: z.string().optional(),
        category: z.string().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.flashcard.findMany({
        where: {
          cardset: input.cardset,
          category: input.category,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.flashcard.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
