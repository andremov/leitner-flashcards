"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function CreateQuestionTemplateButton() {
  const router = useRouter();
  const utils = api.useUtils();

  const createQuestionTemplate = api.questionTemplate.create.useMutation({
    onSuccess: () => {
      void utils.questionTemplate.getAll.invalidate();
      router.refresh();
    },
  });

  const createDraftQuestionTemplate = () =>
    createQuestionTemplate.mutate({
      title: "New template",
      body: "Template body",
    });

  return (
    <button
      onClick={createDraftQuestionTemplate}
      className="cursor-pointer rounded-md bg-black/30 py-1 text-white transition hover:bg-black/50"
    >
      New template
    </button>
  );
}
