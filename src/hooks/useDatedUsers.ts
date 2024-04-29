import { Temporal } from "@js-temporal/polyfill";
import type { UserType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedUsers(): UserType[] | undefined {
  const { data: users } = api.user.getAll.useQuery({});

  if (users === undefined) {
    return undefined;
  }

  return users.map((u) => {
    const createdAt = new Temporal.PlainDate(
      u.createdAt.getFullYear(),
      u.createdAt.getMonth() + 1,
      u.createdAt.getDate(),
    );
    const updatedAt = new Temporal.PlainDate(
      u.updatedAt.getFullYear(),
      u.updatedAt.getMonth() + 1,
      u.updatedAt.getDate(),
    );
    const lastPlayedAt = new Temporal.PlainDate(
      u.lastPlayedAt.getFullYear(),
      u.lastPlayedAt.getMonth() + 1,
      u.lastPlayedAt.getDate(),
    );

    return {
      ...u,
      createdAt,
      updatedAt,
      lastPlayedAt,
    };
  });
}
