// MAGIC PAGE TYPES

export type ReceivingPageProps = {
  cardset: string;
  category: string;
  flashcard: string;
  question: string;
};

export type PartialRPP = Partial<ReceivingPageProps>;

export type MagicPageProps = {
  selectedCardsetId: string;
  selectedCategoryId: string;
  selectedFlashcardId: string;
  selectedQuestionId: string;
  editingModel: "cardset" | "category" | "flashcard" | "question";
  deletingModel: "cardset" | "category" | "flashcard" | "question";
};

export type PartialMPP = Partial<MagicPageProps>;

// PARSED TYPES

import { type Question } from "@prisma/client";

export type DatedQuestionCard = Question & {
  due: string;
  box: number;
  right: number;
  wrong: number;
};

// LOCAL STORAGE TYPES

export type StreakDataDayType = {
  played: boolean;
  right: number;
  wrong: number;
  remain: number;
};

export type StreakDataType = {
  month: number;
  currentStreak: number;
  longestStreak: number;
  days: StreakDataDayType[];
};

export type CardsetStorageType = {
  version: string;
  questionData: Record<
    string,
    { due: string; box: number; right: number; wrong: number }
  >;
};
