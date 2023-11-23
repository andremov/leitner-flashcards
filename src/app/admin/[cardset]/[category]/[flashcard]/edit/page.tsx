import MagicPage from "~/app/_components/magic-page";
import { type PartialRPP } from "~/types/magic-page-types";

export default function Page({ params }: { params: PartialRPP }) {
  return (
    <MagicPage
      selectedCardsetId={params.cardset}
      selectedCategoryId={params.category}
      selectedFlashcardId={params.flashcard}
      editingModel={"flashcard"}
      deletingModel={undefined}
    />
  );
}
