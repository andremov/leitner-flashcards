import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/server";
import CreateFlashCardButton from "../create-components/create-flashcard";

export default async function ListFlashcards(props: {
  selectedCardsetId?: string;
  selectedCategoryId?: string;
  selectedFlashcardId?: string;
}) {
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
          <div
            key={flashcard.id}
            className={`flex items-center justify-between rounded-md px-4 py-2 transition ${
              selectedFlashcardId === flashcard.id
                ? "bg-indigo-500 text-white"
                : "bg-indigo-300"
            }`}
          >
            <span>{flashcard.title}</span>
            <div className="flex gap-2">
              <Link
                href={`/admin/${selectedCardsetId}/${selectedCategoryId}/${flashcard.id}`}
                className="w-6 rounded-sm transition hover:bg-black/20"
              >
                <ExternalLink className="mx-auto w-5" />
              </Link>
              <button className="w-6 rounded-sm transition hover:bg-black/20">
                <Pencil className="mx-auto w-5" />
              </button>
              <button className="w-6 rounded-sm transition hover:bg-red-500/40">
                <Trash className="mx-auto w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateFlashCardButton {...props} />
    </div>
  );
}
