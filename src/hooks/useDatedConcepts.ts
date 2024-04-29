import { Temporal } from "@js-temporal/polyfill";
import type { ConceptType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedConcepts(): ConceptType[] | undefined {
  const { data: concepts } = api.concept.getAll.useQuery({});

  if (concepts === undefined) {
    return undefined;
  }

  return concepts.map((c) => {
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
