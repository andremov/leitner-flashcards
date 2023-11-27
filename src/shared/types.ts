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
  editingModel: string;
  deletingModel: string;
};

export type PartialMPP = Partial<MagicPageProps>;

// PARSED TYPES

import { type Flashcard } from "@prisma/client";

export type DatedFlashcard = Flashcard & {
  due: string;
  box: number;
  right: number;
  wrong: number;
};
