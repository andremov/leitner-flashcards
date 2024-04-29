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
        partialize: (state) => ({}),
        version: 1.4,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
