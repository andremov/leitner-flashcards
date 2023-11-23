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
