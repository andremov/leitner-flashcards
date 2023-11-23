"use client";

import { api } from "~/trpc/react";

export default function CreateQuestionButton(props: {
  selectedFlashcardId: string;
}) {
  const { selectedFlashcardId } = props;

  const createQuestion = api.question.create.useMutation();

  const createDraftQuestion = () =>
    createQuestion.mutate({
      title: "New question",
      body: "Question body",
      answer: "Answer1",
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
