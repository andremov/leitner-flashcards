"use client";

import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createQuestionSlice } from "./slices/questionSlice/questionSlice";
import type { QuestionSlice } from "./slices/questionSlice/questionSlice.types";
import { create } from "zustand";

export type StoreState = QuestionSlice;

export type LfStoreMiddlewares = [
  ["zustand/devtools", never],
  ["zustand/persist", unknown],
];

export const useQuestionStore = create<StoreState>()(
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
);
