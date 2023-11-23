import ListCardSets from "../_components/list-components/list-cardsets";
import ListCategories from "../_components/list-components/list-categories";
import { api } from "~/trpc/server";
import ListFlashcards from "../_components/list-components/list-flashcards";
import EditCardSet from "../_components/edit-components/edit-cardset";
import DeleteCardSet from "../_components/delete-components/delete-cardset";
import EditCategory from "../_components/edit-components/edit-category";
import DeleteCategory from "../_components/delete-components/delete-category";
import ListQuestions from "./list-components/list-questions";
import { type PartialMPP } from "~/types/magic-page-types";
import EditFlashcard from "./edit-components/edit-flashcard";
import DeleteFlashcard from "./delete-components/delete-flashcard";
import EditQuestion from "./edit-components/edit-question";
import DeleteQuestion from "./delete-components/delete-question";

export default async function MagicPage(props: PartialMPP) {
  const {
    selectedCardsetId,
    selectedCategoryId,
    selectedFlashcardId,
    deletingModel,
    editingModel,
    selectedQuestionId,
  } = props;

  const selectedCardset = await api.cardset.findOne.query({
    id: selectedCardsetId ?? "",
  });

  const selectedCategory = await api.category.findOne.query({
    id: selectedCategoryId ?? "",
  });

  const selectedFlashcard = await api.flashcard.findOne.query({
    id: selectedFlashcardId ?? "",
  });

  return (
    <main className="flex min-h-screen flex-col bg-slate-300">
      <div className="flex h-16 w-screen items-center justify-center">
        <div className="rounded-md border border-black bg-white px-4 py-2">
          / {selectedCardset && `${selectedCardset.name} /`}{" "}
          {selectedCategory && `${selectedCategory.name} /`}{" "}
          {selectedFlashcard && `${selectedFlashcard.title} /`}
        </div>
      </div>
      <div className="flex flex-1 items-stretch gap-1">
        <ListCardSets {...props} />
        <EditCardSet {...props} />
        <DeleteCardSet {...props} />

        <ListCategories {...props} />
        <EditCategory {...props} />
        <DeleteCategory {...props} />

        <ListFlashcards {...props} />
        <EditFlashcard {...props} />
        <DeleteFlashcard {...props} />

        <ListQuestions {...props} />
        <EditQuestion {...props} />
        <DeleteQuestion {...props} />
      </div>
    </main>
  );
}
