import type { StateCreator } from "zustand";
import type { LfStoreMiddlewares, StoreState } from "~/store/userStore";
import type { UserSlice } from "./userSlice.types";
import type { UserType } from "~/shared/types";

export const createUserSlice: StateCreator<
  StoreState,
  [...LfStoreMiddlewares],
  [],
  UserSlice
> = (set, get) => ({
  user: undefined,
  userId: undefined,

  setUser: (user: UserType | undefined) => {
    set({
      user,
      userId: user?.id,
    });
  },
});
