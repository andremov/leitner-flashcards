"use client";

import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createAdminSlice } from "./slices/adminSlice/adminSlice";
import type { AdminSlice } from "./slices/adminSlice/adminSlice.types";
import { create } from "zustand";

export type StoreState = AdminSlice;

export type LfStoreMiddlewares = [
  ["zustand/devtools", never],
  ["zustand/persist", unknown],
];

export const useAdminStore = create<StoreState>()(
  devtools(
    persist(
      (...methods) => ({
        ...createAdminSlice(...methods),
      }),
      {
        name: "adminStore",
        partialize: (state) => ({}),
        version: 1.3,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
