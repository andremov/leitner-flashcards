"use client";

import { FolderIcon, PlusCircleIcon } from "lucide-react";
import type { CategoryType } from "~/shared/types";
import { useAdminStore } from "~/store/adminStore";
import { AdminModal } from "~/store/slices/adminSlice/adminSlice.types";

export function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <div
      className={`bg-${category.color}-500 flex h-24 w-52 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-4 border-white text-white shadow-2xl transition hover:scale-95 active:scale-90`}
    >
      <div className="flex items-center gap-2">
        <FolderIcon width={25} height={25} />
        <span className="text-xl">{category.name}</span>
      </div>
    </div>
  );
}

export function NewCategoryCard() {
  const { setActiveModal } = useAdminStore();

  function setCreateCategoryModal() {
    setActiveModal(AdminModal.CREATE_CATEGORY);
  }

  return (
    <div
      className="flex h-24 w-52 cursor-pointer items-center justify-center gap-2 rounded-lg border-4 border-white bg-green-400 text-white shadow-2xl transition hover:scale-95 active:scale-90"
      onClick={setCreateCategoryModal}
    >
      <PlusCircleIcon width={25} height={25} />
      <span className="text-xl">New category</span>
    </div>
  );
}

export function SkeletonCategoryCard() {
  return <div className="h-24 w-52 animate-pulse rounded-lg bg-slate-600/20" />;
}
