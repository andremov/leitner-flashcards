import { createTRPCRouter } from "~/server/api/trpc";
import { flashcardRouter } from "./routers/flashcard";
import { questionRouter } from "./routers/question";
import { questionTemplateRouter } from "./routers/question-template";
// import { cardsetRouter } from "./routers/cardset";
import { categoryRouter } from "./routers/category";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  question: questionRouter,
  questionTemplate: questionTemplateRouter,
  flashcard: flashcardRouter,
  category: categoryRouter,
  user: userRouter,
  // cardset: cardsetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
