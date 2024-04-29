"use client";

import { DotIcon, HelpCircleIcon, PlusCircleIcon } from "lucide-react";
import type { CategoryType, ConceptType, QuestionType } from "~/shared/types";
import { useAdminStore } from "~/store/adminStore";
import { AdminModal } from "~/store/slices/adminSlice/adminSlice.types";

export function QuestionCard({
  question,
  category,
  concept,
}: {
  question: QuestionType;
  category?: CategoryType;
  concept?: ConceptType;
}) {
  const { color: categoryColor, name: categoryName } = category ?? {
    color: "blue",
    name: "",
  };
  const { title: conceptName } = concept ?? {
    title: "",
  };

  return (
    <div
      className={`bg-${categoryColor}-500 flex h-40 w-72 cursor-pointer select-none flex-col items-center justify-between gap-2 rounded-lg border-4 border-white px-2 py-4 text-white shadow-2xl transition hover:scale-95 active:scale-90`}
      title={question.body}
    >
      <HelpCircleIcon width={35} height={35} />
      <span className="text-center text-sm">{question.body}</span>

      <div className="flex justify-center gap-0.5">
        <span className="text-md w-fit max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-black/20 px-2 py-0.5">
          {conceptName}
        </span>
        <DotIcon />
        <span className="text-md">{categoryName}</span>
      </div>
    </div>
  );
}

export function NewQuestionCard() {
  const { setActiveModal } = useAdminStore();

  function setCreateUserModal() {
    setActiveModal(AdminModal.CREATE_QUESTION);
  }

  return (
    <div
      className="flex h-40 w-72 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-4 border-white bg-green-500 text-white shadow-2xl transition hover:scale-95 active:scale-90"
      onClick={setCreateUserModal}
    >
      <PlusCircleIcon width={35} height={35} />
      <span className="text-md">New question</span>
    </div>
  );
}

export function SkeletonQuestionCard() {
  return <div className="h-40 w-72 animate-pulse rounded-lg bg-slate-600/20" />;
}
