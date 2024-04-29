import { Temporal } from "@js-temporal/polyfill";
import type { QuestionTemplateType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedTemplates(): QuestionTemplateType[] | undefined {
  const { data: templates } = api.questionTemplate.getAll.useQuery();

  if (templates === undefined) {
    return undefined;
  }

  return templates.map((t) => {
    const createdAt = Temporal.Instant.from(t.createdAt.toISOString());
    const updatedAt = Temporal.Instant.from(t.updatedAt.toISOString());

    return {
      ...t,
      createdAt,
      updatedAt,
    };
  });
}
