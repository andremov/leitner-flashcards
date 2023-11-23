"use client";
import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function ListCards() {
  const utils = api.useUtils();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCardsetId = searchParams.get("cardset");
  const selectedCategoryId = searchParams.get("category");

  const { data: flashcards } = api.flashcard.getAll.useQuery({
    cardset: selectedCardsetId ?? undefined,
    category: selectedCategoryId ?? undefined,
  });

  const createFlashcard = api.flashcard.create.useMutation({
    onSuccess: () => {
      router.refresh();
      void utils.flashcard.getAll.invalidate();
    },
  });

  if (!selectedCardsetId || !selectedCategoryId) return <></>;

  const createDraftFlashcard = () =>
    createFlashcard.mutate({
      title: "New card",
      description: "",
      cardset: selectedCardsetId,
      category: selectedCategoryId,
    });

  return (
    <div className="flex w-full flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      {flashcards && <p>{flashcards.length} flashcards in category</p>}

      <div className="my-2 flex flex-1 select-none flex-col gap-1">
        {flashcards?.map((flashcard) => (
          <div
            key={flashcard.id}
            className={`flex items-center justify-between rounded-md px-4 py-2 transition ${
              selectedCardsetId === flashcard.id
                ? "bg-indigo-500 text-white"
                : "bg-indigo-300"
            }`}
          >
            <span>{flashcard.title}</span>
            <div className="flex gap-2">
              {/* <Link
                href={`/admin?cardset=${selectedCardset}&category=${category.id}`}
                className="w-6 rounded-sm transition hover:bg-black/20"
              >
                <ExternalLink className="mx-auto w-5" />
              </Link> */}
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

      <button
        onClick={createDraftFlashcard}
        className="h-12 w-full rounded-md bg-emerald-600 px-4 py-1 text-white transition hover:bg-emerald-500"
      >
        Create a flashcard
      </button>
    </div>
  );
}
