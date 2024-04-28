import { Temporal } from "@js-temporal/polyfill";
import type { UserType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedUsers(): UserType[] | undefined {
  const { data: users } = api.user.getAll.useQuery({});

  if (users === undefined) {
    return undefined;
  }

  return users.map((u) => {
    const createdAt = Temporal.Instant.from(u.createdAt.toISOString());
    const updatedAt = Temporal.Instant.from(u.updatedAt.toISOString());

    return {
      ...u,
      createdAt,
      updatedAt,
    };
  });
}
