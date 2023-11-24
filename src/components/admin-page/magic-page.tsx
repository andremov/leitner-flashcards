import ListCardSets from "./list-components/list-cardsets";
import ListCategories from "./list-components/list-categories";
import { api } from "~/trpc/server";
import ListFlashcards from "./list-components/list-flashcards";
import EditCardSet from "./edit-components/edit-cardset";
import DeleteCardSet from "./delete-components/delete-cardset";
import EditCategory from "./edit-components/edit-category";
import DeleteCategory from "./delete-components/delete-category";
import ListQuestions from "./list-components/list-questions";
import { type PartialMPP } from "~/types/magic-page-types";
import EditFlashcard from "./edit-components/edit-flashcard";
import DeleteFlashcard from "./delete-components/delete-flashcard";
import EditQuestion from "./edit-components/edit-question";
import DeleteQuestion from "./delete-components/delete-question";
import ViewQuestion from "./list-components/view-question";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default async function MagicPage(props: PartialMPP) {
  const {
    selectedCardsetId,
    selectedCategoryId,
    selectedFlashcardId,
    selectedQuestionId,
    deletingModel,
    editingModel,
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

  const selectedQuestion = await api.question.findOne.query({
    id: selectedQuestionId ?? "",
  });

  return (
    <main className="flex min-h-screen flex-col bg-slate-300">
      <div className="relative flex h-16 w-screen items-center justify-center">
        <Link
          href={"/"}
          className="border-blac absolute left-10 rounded-md border-2 border-black bg-white px-4 py-2"
        >
          <ArrowBigLeft />
        </Link>
        <div className="rounded-md border border-black bg-white px-4 py-2">
          / {selectedCardset && `${selectedCardset.name} /`}{" "}
          {selectedCategory && `${selectedCategory.name} /`}{" "}
          {selectedFlashcard && `${selectedFlashcard.title} /`}{" "}
          {selectedQuestion && `${selectedQuestion.title} /`}{" "}
          {editingModel && "EDITING"}
          {deletingModel && "DELETING"}
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

        <ViewQuestion {...props} />
      </div>
    </main>
  );
}