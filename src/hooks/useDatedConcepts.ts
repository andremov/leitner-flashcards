import { Temporal } from "@js-temporal/polyfill";
import type { ConceptType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedConcepts(): ConceptType[] | undefined {
  const { data: concepts } = api.concept.getAll.useQuery({});

  if (concepts === undefined) {
    return undefined;
  }

  return concepts.map((c) => {
    const createdAt = Temporal.Instant.from(c.createdAt.toISOString());
    const updatedAt = Temporal.Instant.from(c.updatedAt.toISOString());

    return {
      ...c,
      createdAt,
      updatedAt,
    };
  });
}
