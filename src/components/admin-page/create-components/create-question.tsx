"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function CreateQuestionButton(props: {
  selectedCardsetId: string;
  selectedCategoryId: string;
  selectedFlashcardId: string;
}) {
  const { selectedCardsetId, selectedCategoryId, selectedFlashcardId } = props;
  const router = useRouter();

  const createQuestion = api.question.create.useMutation({
    onSuccess: (newQuestion) => {
      router.push(
        `/admin/${selectedCardsetId}/${selectedCategoryId}/${selectedFlashcardId}/${newQuestion.id}/edit`,
      );
    },
  });

  const createDraftQuestion = () =>
    createQuestion.mutate({
      title: "New question",
      body: "Question body",
      answer: 0,
      flashcard: selectedFlashcardId,
      options: ["Answer1", "Answer2"],
    });

  return (
    <button
      onClick={createDraftQuestion}
      className="h-12 w-full rounded-md bg-emerald-600 px-4 py-1 text-white transition hover:bg-emerald-500"
    >
      Create a question
    </button>
  );
}
