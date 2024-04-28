import { Temporal } from "@js-temporal/polyfill";
import type { CategoryType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedCategories(): CategoryType[] | undefined {
  const { data: categories } = api.category.getAll.useQuery({});

  if (categories === undefined) {
    return undefined;
  }

  return categories.map((c) => {
    const createdAt = Temporal.Instant.from(c.createdAt.toISOString());
    const updatedAt = Temporal.Instant.from(c.updatedAt.toISOString());

    return {
      ...c,
      createdAt,
      updatedAt,
    };
  });
}
