import ListCardSets from "./list-components/list-cardsets";
import ListCategories from "./list-components/list-categories";
import { api } from "~/trpc/server";
import ListFlashcards from "./list-components/list-flashcards";
import EditCardSet from "./edit-components/edit-cardset";
import DeleteCardSet from "./delete-components/delete-cardset";
import EditCategory from "./edit-components/edit-category";
import DeleteCategory from "./delete-components/delete-category";
import ListQuestions from "./list-components/list-questions";
import { type PartialMPP } from "~/shared/types";
import EditFlashcard from "./edit-components/edit-flashcard";
import DeleteFlashcard from "./delete-components/delete-flashcard";
import EditQuestion from "./edit-components/edit-question";
import DeleteQuestion from "./delete-components/delete-question";
import ViewQuestion from "./list-components/view-question";
import { ArrowBigLeft, ChevronRight, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export default async function MagicPage(props: PartialMPP) {
  const {
    selectedCategoryId,
    selectedFlashcardId,
    selectedQuestionId,
    deletingModel,
    editingModel,
  } = props;

  const selectedCategory =
    !!selectedCategoryId &&
    (await api.category.findOne.query({
      id: selectedCategoryId,
    }));

  const selectedFlashcard =
    !!selectedFlashcardId &&
    (await api.flashcard.findOne.query({
      id: selectedFlashcardId,
    }));

  const selectedQuestion =
    !!selectedQuestionId &&
    (await api.question.findOne.query({
      id: selectedQuestionId,
    }));

  const activeViews = Object.keys(props).filter(
    (key) => !!props[key as keyof PartialMPP],
  );

  const curActiveView =
    activeViews.filter((key) => key.includes("selected")).length -
    activeViews.filter((key) => !key.includes("selected")).length;

  return (
    <main className="flex min-h-screen flex-col bg-slate-300">
      <div className="relative flex h-16 w-screen items-center justify-center">
        <Link
          href={"/"}
          className="absolute left-10 rounded-md border-2 border-black bg-white px-4 py-2"
        >
          <ArrowBigLeft />
        </Link>
        <div className="flex items-center gap-1 rounded-md bg-white px-4 py-2">
          <ChevronRight width={20} />

          {selectedCategory && (
            <>
              <Link
                className="cursor-pointer rounded-md border border-black/20 px-2 py-1 hover:bg-black/10"
                href={`/admin/${selectedCategoryId}`}
              >
                {selectedCategory.name}
              </Link>
              {editingModel === "category" && <Pencil width={20} />}
              {deletingModel === "category" && <Trash width={20} />}
            </>
          )}
          {selectedFlashcard && (
            <>
              <ChevronRight width={20} />
              <Link
                className="cursor-pointer rounded-md border border-black/20 px-2 py-1 hover:bg-black/10"
                href={`/admin/${selectedCategoryId}/${selectedFlashcardId}`}
              >
                {selectedFlashcard.title}
              </Link>
              {editingModel === "flashcard" && <Pencil width={20} />}
              {deletingModel === "flashcard" && <Trash width={20} />}
            </>
          )}
          {selectedQuestion && (
            <>
              <ChevronRight width={20} />
              <Link
                className="cursor-pointer rounded-md border border-black/20 px-2 py-1 hover:bg-black/10"
                href={`/admin/${selectedCategoryId}/${selectedFlashcardId}/${selectedQuestionId}`}
              >
                {selectedQuestion.title}
              </Link>
              {editingModel === "question" && <Pencil width={20} />}
              {deletingModel === "question" && <Trash width={20} />}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-1 items-stretch gap-1">
        <ListCategories {...props} isActive={curActiveView <= 2} />
        {selectedCategoryId && <EditCategory {...props} />}
        {selectedCategoryId && <DeleteCategory {...props} />}

        {selectedCategoryId && (
          <ListFlashcards
            {...props}
            selectedCategoryId={selectedCategoryId}
            isActive={curActiveView <= 3}
          />
        )}
        {selectedFlashcard && <EditFlashcard {...props} />}
        {selectedFlashcard && <DeleteFlashcard {...props} />}

        {selectedCategoryId && selectedFlashcard && (
          <ListQuestions
            {...props}
            selectedCategoryId={selectedCategoryId}
            selectedFlashcardId={selectedFlashcardId}
          />
        )}
        {selectedQuestion && <EditQuestion {...props} />}
        {selectedQuestion && <DeleteQuestion {...props} />}

        {selectedQuestion && <ViewQuestion {...props} />}
      </div>
    </main>
  );
}
