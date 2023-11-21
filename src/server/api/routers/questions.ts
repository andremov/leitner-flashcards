import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
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
        body: z.string().min(1),
        answer: z.string().min(1),
        options: z.array(z.string().min(1)).min(1),
        categories: z.array(z.string().min(1)).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.question.create({
        data: {
          body: input.body,
          answer: input.answer,
          options: input.options,
          categories: input.categories,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.question.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
