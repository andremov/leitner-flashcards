"use client";

import { PlusCircleIcon, Puzzle } from "lucide-react";
import type { QuestionTemplateType } from "~/shared/types";
import { useAdminStore } from "~/store/adminStore";
import { AdminModal } from "~/store/slices/adminSlice/adminSlice.types";

export function QuestionTemplateCard({
  template,
}: {
  template: QuestionTemplateType;
}) {
  return (
    <div
      className={`flex h-24 w-52 cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-lg border-4 border-white bg-amber-500 text-white shadow-2xl transition hover:scale-95 active:scale-90`}
    >
      <Puzzle width={25} height={25} />
      <span className="text-md max-w-[11rem] overflow-hidden text-ellipsis whitespace-nowrap ">
        {template.body}
      </span>
    </div>
  );
}

export function NewQuestionTemplateCard() {
  const { setActiveModal } = useAdminStore();

  function setCreateCategoryModal() {
    setActiveModal(AdminModal.CREATE_TEMPLATE);
  }

  return (
    <div
      className="flex h-24 w-52 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-4 border-white bg-green-400 text-white shadow-2xl transition hover:scale-95 active:scale-90"
      onClick={setCreateCategoryModal}
    >
      <PlusCircleIcon width={25} height={25} />
      <span className="text-md">New category</span>
    </div>
  );
}

export function SkeletonQuestionTemplateCard() {
  return <div className="h-24 w-52 animate-pulse rounded-lg bg-slate-600/20" />;
}
