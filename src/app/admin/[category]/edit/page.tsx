import MagicPage from "~/components/admin-page/magic-page";
import { type PartialRPP } from "~/shared/types";

export default function Page({ params }: { params: PartialRPP }) {
  return (
    <MagicPage
      selectedCategoryId={params.category}
      selectedFlashcardId={params.flashcard}
      selectedQuestionId={params.question}
      editingModel={"category"}
      deletingModel={undefined}
    />
  );
}
