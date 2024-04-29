import { Temporal } from "@js-temporal/polyfill";
import type { CategoryType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedCategories(): CategoryType[] | undefined {
  const { data: categories } = api.category.getAll.useQuery({});

  if (categories === undefined) {
    return undefined;
  }

  return categories.map((c) => {
    const createdAt = new Temporal.PlainDate(
      c.createdAt.getFullYear(),
      c.createdAt.getMonth() + 1,
      c.createdAt.getDate(),
    );
    const updatedAt = new Temporal.PlainDate(
      c.updatedAt.getFullYear(),
      c.updatedAt.getMonth() + 1,
      c.updatedAt.getDate(),
    );

    return {
      ...c,
      createdAt,
      updatedAt,
    };
  });
}
