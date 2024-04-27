"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function CreateCategoryButton() {
  const router = useRouter();

  const createCategory = api.category.create.useMutation({
    onSuccess: (newCategory) => {
      router.push(`/admin/${newCategory.id}/edit`);
    },
  });

  const createDraftCategory = () =>
    createCategory.mutate({
      name: "New category",
      color: "emerald-500",
    });

  return (
    <button
      onClick={createDraftCategory}
      className="h-12 w-full rounded-md bg-emerald-600 px-4 py-1 text-white transition hover:bg-emerald-500"
    >
      Create a category
    </button>
  );
}
