import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionTemplateRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.questionTemplate.create({
        data: {
          title: input.title,
          body: input.body,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    try {
      return ctx.db.questionTemplate.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (e: unknown) {
      console.error(e!);
      console.error(JSON.stringify(e));
    }
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.questionTemplate.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
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
    // .input(
    //   z.object({
    //     id: z.string(),
    //   }),
    // )
    .query(
      ({
        ctx,
        // input
      }) => {
        return ctx.db.questionTemplate.findFirst({
          // where: {
          //   id: input.id,
          // },
          orderBy: { createdAt: "desc" },
        });
      },
    ),
});
