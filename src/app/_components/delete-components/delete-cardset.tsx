"use client";

import { Check, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function DeleteCardSet() {
  const utils = api.useUtils();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deletingCardsetId = searchParams.get("cardset-delete");

  const { data: categories } = api.category.getAll.useQuery({
    cardset: deletingCardsetId ?? undefined,
  });

  const { data: deletingCardset } = api.question.findOne.useQuery({
    id: deletingCardsetId ?? "",
  });

  const deleteCardSet = api.question.delete.useMutation({
    onSuccess: () => {
      router.push("/admin");
      void utils.question.getAll.invalidate();
    },
  });

  if (!deletingCardset) return <></>;

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          deleteCardSet.mutate({
            id: deletingCardset.id,
          });
        }}
        className="relative my-2 flex w-8/12 select-none flex-col gap-1 rounded-lg bg-slate-500 p-4"
      >
        <p className="text-center text-white">
          Are you sure you want to delete{" "}
          <strong>{deletingCardset.name}</strong> ?
        </p>

        {categories ? (
          categories.length > 0 ? (
            <p className="my-2 flex items-center gap-2 rounded-md bg-red-500/50 p-2 text-center text-white">
              <X />
              {categories.length} categor{categories.length === 1 ? "y" : "ies"}{" "}
              in cardset.
            </p>
          ) : (
            <p className="my-2 flex items-center gap-2 rounded-md bg-lime-500/50 p-2 text-center text-white">
              <Check className="w-5" /> Cardset has no categories
            </p>
          )
        ) : (
          <p className="my-2 text-white">Loading category count...</p>
        )}

        <button
          type="submit"
          className="mt-4 rounded-full bg-red-500/50 px-10 py-3 font-semibold transition hover:bg-red-500/80 disabled:bg-white/10"
          disabled={
            !categories || categories.length > 0 || deleteCardSet.isLoading
          }
        >
          {deleteCardSet.isLoading ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  );
}
