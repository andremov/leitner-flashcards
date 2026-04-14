import { createTRPCRouter } from "~/server/api/trpc";
import { conceptRouter } from "./routers/concept";
import { questionRouter } from "./routers/question";
import { questionTemplateRouter } from "./routers/question-template";
import { categoryRouter } from "./routers/category";
import { userRouter } from "./routers/user";
import { userQuestionHistoryRouter } from "./routers/user-question-history";
import { dailyWordRouter } from "./routers/daily-word";
import { dailyWordExampleRouter } from "./routers/daily-word-example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  question: questionRouter,
  questionTemplate: questionTemplateRouter,
  concept: conceptRouter,
  category: categoryRouter,
  user: userRouter,
  questionHistory: userQuestionHistoryRouter,
  dailyWord: dailyWordRouter,
  dailyWordExample: dailyWordExampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
