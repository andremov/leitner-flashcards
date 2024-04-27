import type { StateCreator } from "zustand";
import { Temporal } from "@js-temporal/polyfill";
import type { LfStoreMiddlewares, StoreState } from "~/store/questionStore";
import type { QuestionSlice } from "./questionSlice.types";
import type { DatedQuestionCard } from "~/shared/types";
import type { Question } from "@prisma/client";

function getPlainDateFromDue(dueDate: string): Temporal.PlainDate {
  const [year, month, day] = dueDate.split("-");

  return new Temporal.PlainDate(+year!, +month!, +day!);
}

function mapBox(newBox: number) {
  const boxMapping = [1, 2, 3, 5, 8, 13, 21, 34, 55];

  if (newBox > boxMapping.length) {
    return boxMapping[boxMapping.length - 1];
  }

  return boxMapping[newBox];
}

function isQuestionDue(ffc: { due: string }, today: Temporal.PlainDate) {
  const flashcardDate = getPlainDateFromDue(ffc.due);

  return flashcardDate.until(today).days >= 0;
}

export const createQuestionSlice: StateCreator<
  StoreState,
  [...LfStoreMiddlewares],
  [],
  QuestionSlice
> = (set, get) => ({
  questions: {},
  getPendingCount: (allQuestions: string[]): number => {
    const { questions } = get();

    const today = Temporal.Now.plainDateISO();

    return allQuestions.filter(
      (questionId) =>
        !questions[questionId] || isQuestionDue(questions[questionId]!, today),
    ).length;
  },
  getPendingQuestions: (allQuestions: Question[]): DatedQuestionCard[] => {
    const { questions } = get();

    const today = Temporal.Now.plainDateISO();

    return allQuestions
      .filter(
        ({ id: questionId }) =>
          !questions[questionId] ||
          isQuestionDue(questions[questionId]!, today),
      )
      .map((question) => ({
        rgt: 0,
        wrg: 0,
        box: 0,
        due: `${today.year}-${today.month}-${today.day}`,
        ...questions[question.id],
        ...question,
      }));
  },
  updateQuestion: (questionId: string, diff: number) => {
    const { questions } = get();

    const triggeringQuestion = questions[questionId] ?? {
      box: 0,
      due: "",
      rgt: 0,
      wrg: 0,
    };

    const { day, month, year } = Temporal.Now.plainDateISO().add({
      days: mapBox(triggeringQuestion.box + diff),
    });

    const resultingQuestion = {
      box: triggeringQuestion.box + diff,
      due: `${year}-${month}-${day}`,
      rgt: triggeringQuestion.rgt + diff,
      wrg: triggeringQuestion.wrg + ((diff + 1) % 2),
    };

    set({ questions: { ...questions, [questionId]: resultingQuestion } });
  },
});
