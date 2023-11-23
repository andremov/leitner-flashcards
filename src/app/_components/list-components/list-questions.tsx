"use client";

import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function ListQuestions() {
  const utils = api.useUtils();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedFlashcardId = searchParams.get("");

  const { data: cardsets } = api.cardset.getAll.useQuery();

  const createCardSet = api.cardset.create.useMutation({
    onSuccess: () => {
      router.refresh();
      void utils.cardset.getAll.invalidate();
    },
  });

  const createDraftCardSet = () =>
    createCardSet.mutate({ name: "New card set" });

  return (
    <div className="flex w-full flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      {cardsets && <p>{cardsets.length} card sets</p>}

      <div className="my-2 flex flex-1 select-none flex-col gap-1">
        {cardsets?.map((cardset) => (
          <div
            key={cardset.id}
            className={`rounded-md px-4 py-2 transition ${
              selectedCardsetId === cardset.id
                ? "bg-purple-500 text-white"
                : "bg-purple-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{cardset.name}</span>
              <div className="flex gap-2">
                <Link
                  href={`/admin?cardset=${cardset.id}`}
                  className="w-6 rounded-sm transition hover:bg-black/20"
                >
                  <ExternalLink className="mx-auto w-5" />
                </Link>
                <Link
                  href={`/admin?cardset-edit=${cardset.id}`}
                  className="w-6 rounded-sm transition hover:bg-black/20"
                >
                  <Pencil className="mx-auto w-5" />
                </Link>
                <Link
                  href={`/admin?cardset-delete=${cardset.id}`}
                  className="w-6 rounded-sm transition hover:bg-red-500/40"
                >
                  <Trash className="mx-auto w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={createDraftCardSet}
        className="h-12 w-full rounded-md bg-emerald-600 px-4 py-1 text-white transition hover:bg-emerald-500"
      >
        Create a card set
      </button>
    </div>
  );
}
