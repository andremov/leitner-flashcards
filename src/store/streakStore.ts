"use client";

import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createStreakSlice } from "./slices/streakSlice/streakSlice";
import type { StreakSlice } from "./slices/streakSlice/streakSlice.types";
import { create } from "zustand";

export type StoreState = StreakSlice;

export type LfStoreMiddlewares = [
  ["zustand/devtools", never],
  ["zustand/persist", unknown],
];

export const useStreakStore = create<StoreState>()(
  devtools(
    persist(
      (...methods) => ({
        ...createStreakSlice(...methods),
      }),
      {
        name: "streakStore",
        partialize: (state) => ({
          month: state.month,
          currentStreak: state.currentStreak,
          longestStreak: state.longestStreak,
          days: state.days,
        }),
        version: 1.3,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
