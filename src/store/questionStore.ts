/** Libraries **/
import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

/** Functional **/
import { createQuestionSlice } from "./slices/questionSlice/questionSlice";
import type { QuestionSlice } from "./slices/questionSlice/questionSlice.types";

export type StoreState = QuestionSlice;

export type LfStoreMiddlewares = [
  ["zustand/devtools", never],
  ["zustand/persist", unknown],
];

export const useQuestionStore = createWithEqualityFn<StoreState>()(
  devtools(
    persist(
      (...methods) => ({
        ...createQuestionSlice(...methods),
      }),
      {
        name: "questionStore",
        partialize: (state) => ({
          questions: state.questions,
        }),
        version: 1.3,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
  Object.is,
);
