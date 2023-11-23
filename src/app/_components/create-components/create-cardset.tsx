"use client";

import { api } from "~/trpc/react";

export default function CreateCardSet() {
  const createCardSet = api.question.create.useMutation();

  const createDraftCardSet = () =>
    createCardSet.mutate({ name: "New card set" });

  return (
    <button
      onClick={createDraftCardSet}
      className="h-12 w-full rounded-md bg-emerald-600 px-4 py-1 text-white transition hover:bg-emerald-500"
    >
      Create a card set
    </button>
  );
}
