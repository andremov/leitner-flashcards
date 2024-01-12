"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function CreateFlashCardButton(props: {
  selectedCategoryId: string;
}) {
  const { selectedCategoryId } = props;
  const router = useRouter();

  const createFlashcard = api.flashcard.create.useMutation({
    onSuccess: (newFlashcard) => {
      router.push(`/admin/${selectedCategoryId}/${newFlashcard.id}/edit`);
    },
  });

  const createDraftFlashcard = () =>
    createFlashcard.mutate({
      title: "New card",
      description: "",
      category: selectedCategoryId,
    });

  return (
    <button
      onClick={createDraftFlashcard}
      className="h-12 w-full rounded-md bg-emerald-600 px-4 py-1 text-white transition hover:bg-emerald-500"
    >
      Create a flashcard
    </button>
  );
}
