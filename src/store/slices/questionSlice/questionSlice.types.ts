import type { Question } from "@prisma/client";
import type { DatedQuestionCard, QuestionCardInfo } from "~/shared/types";

// LOCAL STORAGE TYPES

export type QuestionStoreState = {
  questions: Record<string, QuestionCardInfo>;
};

export type QuestionSlice = QuestionStoreState & {
  getPendingCount: (allQuestions: string[]) => number;
  getPendingQuestions: (allQuestions: Question[]) => DatedQuestionCard[];
  updateQuestion: (questionId: string, diff: number) => void;
};
