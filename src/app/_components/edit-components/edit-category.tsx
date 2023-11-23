"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type PartialMPP } from "~/types/magic-page-types";

export default function EditCategory(props: PartialMPP) {
  const { selectedCategoryId, editingModel } = props;
  const router = useRouter();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const { data: editingCategory } = api.category.findOne.useQuery({
    id: selectedCategoryId ?? "",
  });

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setColor(editingCategory.color);
    }
  }, [editingCategory]);

  const updateCategory = api.category.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  if (!editingCategory || editingModel !== "category") return <></>;

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCategory.mutate({
            id: editingCategory.id,
            name,
            color,
          });
        }}
        className="my-2 flex w-8/12 select-none flex-col gap-1 rounded-lg bg-slate-500 p-4 "
      >
        <p className="text-white">Category Name</p>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <p className="text-white">Category Color</p>
        <input
          type="text"
          placeholder="Category Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <button
          type="submit"
          className="mt-4 rounded-full bg-white/50 px-10 py-3 font-semibold transition hover:bg-white/80"
          disabled={updateCategory.isLoading}
        >
          {updateCategory.isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
