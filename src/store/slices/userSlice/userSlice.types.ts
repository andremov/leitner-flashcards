import type { User } from "@prisma/client";

export type UserStoreState = {
  userId: string | undefined;
  user: User | undefined;
};

export type UserSlice = UserStoreState & {
  setUser: (user: User) => void;
};
