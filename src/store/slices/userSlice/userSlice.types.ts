import type { UserType } from "~/shared/types";

export type UserStoreState = {
  userId: string | undefined;
  user: UserType | undefined;
};

export type UserSlice = UserStoreState & {
  setUser: (user: UserType | undefined) => void;
};
