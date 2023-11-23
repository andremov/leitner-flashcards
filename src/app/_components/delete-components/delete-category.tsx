"use client";

import { Check, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function DeleteCategory() {
  const utils = api.useUtils();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deletingCategoryId = searchParams.get("category-delete");
  const selectedCardsetId = searchParams.get("cardset");

  const { data: flashcards } = api.flashcard.getAll.useQuery({
    category: deletingCategoryId ?? undefined,
  });

  const { data: deletingCategory } = api.category.findOne.useQuery({
    id: deletingCategoryId ?? "",
  });

  const deleteCategory = api.category.delete.useMutation({
    onSuccess: () => {
      router.push("/admin?cardset=" + selectedCardsetId);
      void utils.cardset.getAll.invalidate();
    },
  });

  if (!deletingCategory) return <></>;

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          deleteCategory.mutate({
            id: deletingCategory.id,
          });
        }}
        className="relative my-2 flex w-8/12 select-none flex-col gap-1 rounded-lg bg-slate-500 p-4"
      >
        <p className="text-center text-white">
          Are you sure you want to delete{" "}
          <strong>{deletingCategory.name}</strong> ?
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
            !flashcards || flashcards.length > 0 || deleteCategory.isLoading
          }
        >
          {deleteCategory.isLoading ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  );
}
