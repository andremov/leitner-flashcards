import { api } from "~/trpc/server";
import CreateFlashCardButton from "../create-components/create-flashcard";
import SimpleView from "../simple-view";
import { type PartialMPP } from "~/types/magic-page-types";

export default async function ListFlashcards(props: PartialMPP) {
  const { selectedCardsetId, selectedCategoryId, selectedFlashcardId } = props;

  const flashcards = await api.flashcard.getAll.query({
    cardset: selectedCardsetId ?? undefined,
    category: selectedCategoryId ?? undefined,
  });

  if (!selectedCardsetId || !selectedCategoryId) return <></>;

  return (
    <div className="flex w-full flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      {flashcards && <p>{flashcards.length} flashcards in category</p>}

      <div className="my-2 flex flex-1 select-none flex-col gap-1">
        {flashcards?.map((flashcard) => (
          <SimpleView
            baseUrl={`/admin/${selectedCardsetId}/${selectedCategoryId}/${flashcard.id}`}
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

      <CreateFlashCardButton {...props} />
    </div>
  );
}
