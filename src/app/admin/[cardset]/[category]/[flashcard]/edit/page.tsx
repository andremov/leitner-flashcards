import MagicPage from "~/components/admin-page/magic-page";
import { type PartialRPP } from "~/shared/types";

export default function Page({ params }: { params: PartialRPP }) {
  return (
    <MagicPage
      selectedCardsetId={params.cardset}
      selectedCategoryId={params.category}
      selectedFlashcardId={params.flashcard}
      selectedQuestionId={params.question}
      editingModel={"flashcard"}
      deletingModel={undefined}
    />
  );
}
