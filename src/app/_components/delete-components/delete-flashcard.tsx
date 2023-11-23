"use client";

import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type PartialMPP } from "~/types/magic-page-types";

export default function DeleteFlashcard(props: PartialMPP) {
  const {
    selectedCardsetId,
    selectedCategoryId,
    selectedFlashcardId,
    deletingModel,
  } = props;
  const router = useRouter();

  const { data: flashcards } = api.question.getAll.useQuery({
    flashcard: selectedFlashcardId ?? undefined,
  });

  const { data: deletingFlashcard } = api.flashcard.findOne.useQuery({
    id: selectedFlashcardId ?? "",
  });

  const deleteFlashcard = api.flashcard.delete.useMutation({
    onSuccess: () => {
      router.push(`/admin/${selectedCardsetId}/${selectedCategoryId}`);
    },
  });

  if (!deletingFlashcard || deletingModel !== "flashcard") return <></>;

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          deleteFlashcard.mutate({
            id: deletingFlashcard.id,
          });
        }}
        className="relative my-2 flex w-8/12 select-none flex-col gap-1 rounded-lg bg-slate-500 p-4"
      >
        <p className="text-center text-white">
          Are you sure you want to delete{" "}
          <strong>{deletingFlashcard.title}</strong> ?
        </p>

        {flashcards ? (
          flashcards.length > 0 ? (
            <p className="my-2 flex items-center gap-2 rounded-md bg-red-500/50 p-2 text-center text-white">
              <X />
              {flashcards.length} flashcard{flashcards.length === 1 ? "" : "s"}{" "}
              in cardset.
            </p>
          ) : (
            <p className="my-2 flex items-center gap-2 rounded-md bg-lime-500/50 p-2 text-center text-white">
              <Check className="w-5" /> Category has no flashcards
            </p>
          )
        ) : (
          <p className="my-2 text-white">Loading flashcard count...</p>
        )}

        <button
          type="submit"
          className="mt-4 rounded-full bg-red-500/50 px-10 py-3 font-semibold transition hover:bg-red-500/80 disabled:bg-white/10"
          disabled={
            !flashcards || flashcards.length > 0 || deleteFlashcard.isLoading
          }
        >
          {deleteFlashcard.isLoading ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  );
}
