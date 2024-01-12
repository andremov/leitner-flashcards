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

export type QuestionCardInfo = {
  due: string;
  box: number;
  rgt: number;
  wrg: number;
};

export type DatedQuestionCard = Question & QuestionCardInfo;
