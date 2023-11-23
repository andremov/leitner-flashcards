import { createTRPCRouter } from "~/server/api/trpc";
import { flashcardRouter } from "./routers/flashcard";
import { questionRouter } from "./routers/question";
import { cardsetRouter } from "./routers/cardset";
import { categoryRouter } from "./routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  question: questionRouter,
  flashcard: flashcardRouter,
  category: categoryRouter,
  cardset: cardsetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
