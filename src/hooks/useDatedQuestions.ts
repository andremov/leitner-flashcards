import { Temporal } from "@js-temporal/polyfill";
import type { QuestionOption, QuestionType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedQuestions(): QuestionType[] | undefined {
  const { data: questions } = api.question.getAll.useQuery({});

  if (questions === undefined) {
    return undefined;
  }

  return questions.map((q) => {
    const createdAt = Temporal.Instant.from(q.createdAt.toISOString());
    const updatedAt = Temporal.Instant.from(q.updatedAt.toISOString());
    const options = q.options.map((o) => JSON.parse(o) as QuestionOption);

    return {
      ...q,
      options,
      createdAt,
      updatedAt,
    };
  });
}
