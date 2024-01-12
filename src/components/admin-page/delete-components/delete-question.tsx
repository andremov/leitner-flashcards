"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type PartialMPP } from "~/shared/types";

export default function DeleteQuestion(props: PartialMPP) {
  const {
    selectedCategoryId,
    selectedFlashcardId,
    selectedQuestionId,
    deletingModel,
  } = props;
  const router = useRouter();

  const { data: deletingQuestion } = api.question.findOne.useQuery({
    id: selectedQuestionId ?? "",
  });

  const deleteCategory = api.question.delete.useMutation({
    onSuccess: () => {
      router.push(`/admin/${selectedCategoryId}/${selectedFlashcardId}`);
    },
  });

  if (!deletingQuestion || deletingModel !== "question") return <></>;

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          deleteCategory.mutate({
            id: deletingQuestion.id,
          });
        }}
        className="relative my-2 flex w-8/12 select-none flex-col gap-1 rounded-lg bg-slate-500 p-4"
      >
        <p className="text-center text-white">
          Are you sure you want to delete{" "}
          <strong>{deletingQuestion.title}</strong> ?
        </p>

        <button
          type="submit"
          className="mt-4 rounded-full bg-red-500/50 px-10 py-3 font-semibold transition hover:bg-red-500/80 disabled:bg-white/10"
          disabled={deleteCategory.isLoading}
        >
          {deleteCategory.isLoading ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  );
}
