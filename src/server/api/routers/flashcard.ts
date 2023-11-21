import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const flashcardRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        datapoints: z.array(z.string().min(1)).min(1),
        categories: z.array(z.string().min(1)).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.flashcard.create({
        data: {
          title: input.title,
          description: input.description,
          datapoints: input.datapoints,
          categories: input.categories,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.flashcard.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
