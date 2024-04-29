"use client";

import { LibrarySquareIcon, PlusCircleIcon } from "lucide-react";
import type { ConceptType, CategoryType } from "~/shared/types";
import { useAdminStore } from "~/store/adminStore";
import { AdminModal } from "~/store/slices/adminSlice/adminSlice.types";

export function ConceptCard({
  concept,
  category,
}: {
  concept: ConceptType;
  category?: CategoryType;
}) {
  const { color: categoryColor, name: categoryName } = category ?? {
    color: "blue",
    name: "",
  };

  return (
    <div
      className={`flex h-24 w-72 cursor-pointer select-none items-center gap-2 rounded-lg border-4 border-white px-2 bg-${categoryColor}-500 text-white shadow-2xl transition hover:scale-95 active:scale-90`}
      title={concept.title}
    >
      <LibrarySquareIcon width={50} height={50} />
      <div className="flex flex-col">
        <span className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap text-xl">
          {concept.title}
        </span>
        <span className="text-md text-white/70">{categoryName}</span>
      </div>
    </div>
  );
}

export function NewConceptCard() {
  const { setActiveModal } = useAdminStore();

  function setCreateUserModal() {
    setActiveModal(AdminModal.CREATE_CONCEPT);
  }

  return (
    <div
      className="flex h-24 w-72 cursor-pointer items-center justify-center gap-2 rounded-lg border-4 border-white bg-green-500 text-white shadow-2xl transition hover:scale-95 active:scale-90"
      onClick={setCreateUserModal}
    >
      <PlusCircleIcon width={25} height={25} />
      <span className="text-xl">New concept</span>
    </div>
  );
}

export function SkeletonConceptCard() {
  return <div className="h-24 w-72 animate-pulse rounded-lg bg-slate-600/20" />;
}
