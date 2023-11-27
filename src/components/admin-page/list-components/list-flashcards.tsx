import { api } from "~/trpc/server";
import CreateFlashCardButton from "../create-components/create-flashcard";
import SimpleView from "../simple-view";
import { type PartialMPP } from "~/shared/types";
import DetailedView from "../detailed-view";

export default async function ListFlashcards(props: PartialMPP) {
  const { selectedCardsetId, selectedCategoryId, selectedFlashcardId } = props;

  const flashcards = await api.flashcard.getAll.query({
    cardset: selectedCardsetId ?? undefined,
    category: selectedCategoryId ?? undefined,
  });

  const selectedCategory = await api.category.findOne.query({
    id: selectedCategoryId,
  });

  if (!selectedCardsetId || !selectedCategory) return <></>;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      <DetailedView data={selectedCategory} type="category" />

      {flashcards && (
        <p>
          {flashcards.length} flashcard{flashcards.length > 1 ? "s" : ""} in
          category
        </p>
      )}

      <div className="my-2 flex flex-1 select-none flex-col gap-1">
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
        selectedCategoryId={selectedCategoryId!}
      />
    </div>
  );
}
