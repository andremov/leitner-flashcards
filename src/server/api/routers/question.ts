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
        title: z.string().min(1),
        body: z.string().min(1),
        answer: z.string().min(1),
        options: z.array(z.string().min(1)).min(1),
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
          category: input.category,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.question.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
