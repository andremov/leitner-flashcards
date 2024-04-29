import { Temporal } from "@js-temporal/polyfill";
import type {
  QuestionOption,
  UserQuestionType,
  UserType,
} from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedUserQuestions(
  userId?: UserType["id"],
): UserQuestionType[] | undefined {
  const { data: questions } = api.question.getAll.useQuery({});
  const { data: questionHistory } = api.questionHistory.getAll.useQuery({
    user: userId ?? "",
  });

  if (questions === undefined || questionHistory === undefined) {
    return undefined;
  }

  const mappedQuestionHistory = questionHistory.map((qh) => {
    const createdAt = new Temporal.PlainDate(
      qh.createdAt.getFullYear(),
      qh.createdAt.getMonth() + 1,
      qh.createdAt.getDate(),
    );
    const updatedAt = new Temporal.PlainDate(
      qh.updatedAt.getFullYear(),
      qh.updatedAt.getMonth() + 1,
      qh.updatedAt.getDate(),
    );
    const due = new Temporal.PlainDate(
      qh.due.getFullYear(),
      qh.due.getMonth() + 1,
      qh.due.getDate(),
    );

    return {
      ...qh,
      due,
      createdAt,
      updatedAt,
    };
  });

  return questions
    .map((q) => {
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

      const history = mappedQuestionHistory.find((qh) => qh.question === q.id);

      return {
        ...q,
        options,
        createdAt,
        updatedAt,
        history,
      };
    })
    .filter((q) => {
      if (q.history === undefined) {
        return true;
      }

      const today = Temporal.Now.plainDateISO();

      if (today.since(q.history.due).sign === 1) {
        return true;
      }

      return false;
    });
}
