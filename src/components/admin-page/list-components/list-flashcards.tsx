import { api } from "~/trpc/server";
import CreateFlashCardButton from "../create-components/create-flashcard";
import SimpleView from "../simple-view";
import { type PartialMPP } from "~/shared/types";
import DetailedView from "../detailed-view";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

type ListFlashcardsProps = PartialMPP & {
  selectedCardsetId: string;
  selectedCategoryId: string;
  isActive: boolean;
};

export default async function ListFlashcards(props: ListFlashcardsProps) {
  const {
    selectedCardsetId,
    selectedCategoryId,
    selectedFlashcardId,
    isActive,
  } = props;

  const flashcards = await api.flashcard.getAll.query({
    cardset: selectedCardsetId,
    category: selectedCategoryId,
  });

  const selectedCategory = await api.category.findOne.query({
    id: selectedCategoryId,
  });

  if (!selectedCardsetId || !selectedCategory) return <></>;

  return (
    <div
      className={`overflow-x-hidden bg-slate-200 transition
      ${isActive ? "flex-1" : "w-10"}`}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      {isActive && (
        <div className="flex h-full flex-col px-4 py-4">
          <DetailedView data={selectedCategory} type="category" />

          {flashcards && (
            <p>
              {flashcards.length} flashcard{flashcards.length > 1 ? "s" : ""} in
              category
            </p>
          )}

          <div className="my-2 flex flex-1 select-none flex-col gap-1 overflow-y-auto">
            {flashcards?.map((flashcard) => (
              <SimpleView
                baseUrl={`/admin/${selectedCardsetId}/${selectedCategoryId}/`}
                id={flashcard.id}
                name={flashcard.title}
                selection={selectedFlashcardId}
                key={flashcard.id}
                activeColor="bg-indigo-500 text-white"
                inactiveColor="bg-indigo-300"
                hasChildren
              />
            ))}
          </div>

          <CreateFlashCardButton
            selectedCardsetId={selectedCardsetId}
            selectedCategoryId={selectedCategoryId}
          />
        </div>
      )}
      {!isActive && (
        <Link
          className="flex h-5/6 w-full cursor-pointer gap-4 p-2 text-xl font-bold transition hover:bg-slate-400"
          style={{ textOrientation: "sideways", writingMode: "vertical-rl" }}
          href={`/admin/${selectedCardsetId}/${selectedCategoryId}`}
        >
          <ArrowBigLeft />
          <span>
            Flashcard:{" "}
            {flashcards.find((item) => item.id === selectedFlashcardId)?.title}
          </span>
        </Link>
      )}
    </div>
  );
}
