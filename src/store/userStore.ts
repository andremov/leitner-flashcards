"use client";

import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createUserSlice } from "./slices/userSlice/userSlice";
import type { UserSlice } from "./slices/userSlice/userSlice.types";
import { create } from "zustand";

export type StoreState = UserSlice;

export type LfStoreMiddlewares = [
  ["zustand/devtools", never],
  ["zustand/persist", unknown],
];

export const useUserStore = create<StoreState>()(
  devtools(
    persist(
      (...methods) => ({
        ...createUserSlice(...methods),
      }),
      {
        name: "userStore",
        partialize: (state) => ({
          userId: state.userId,
        }),
        version: 1.3,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
