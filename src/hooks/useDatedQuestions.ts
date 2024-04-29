import { Temporal } from "@js-temporal/polyfill";
import type { QuestionOption, QuestionType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedQuestions(): QuestionType[] | undefined {
  const { data: questions } = api.question.getAll.useQuery({});

  if (questions === undefined) {
    return undefined;
  }

  return questions.map((q) => {
    const createdAt = new Temporal.PlainDate(
      q.createdAt.getFullYear(),
      q.createdAt.getMonth() + 1,
      q.createdAt.getDate(),
    );
    const updatedAt = new Temporal.PlainDate(
      q.updatedAt.getFullYear(),
      q.updatedAt.getMonth() + 1,
      q.updatedAt.getDate(),
    );
    const options = q.options.map((o) => JSON.parse(o) as QuestionOption);

    return {
      ...q,
      options,
      createdAt,
      updatedAt,
    };
  });
}
