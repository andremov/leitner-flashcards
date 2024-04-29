import { Temporal } from "@js-temporal/polyfill";
import type { QuestionTemplateType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedTemplates(): QuestionTemplateType[] | undefined {
  const { data: templates } = api.questionTemplate.getAll.useQuery();

  if (templates === undefined) {
    return undefined;
  }

  return templates.map((t) => {
    const createdAt = new Temporal.PlainDate(
      t.createdAt.getFullYear(),
      t.createdAt.getMonth() + 1,
      t.createdAt.getDate(),
    );
    const updatedAt = new Temporal.PlainDate(
      t.updatedAt.getFullYear(),
      t.updatedAt.getMonth() + 1,
      t.updatedAt.getDate(),
    );

    return {
      ...t,
      createdAt,
      updatedAt,
    };
  });
}
