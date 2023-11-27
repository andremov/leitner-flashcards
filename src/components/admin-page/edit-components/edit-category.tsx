"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type PartialMPP } from "~/shared/types";

const colors = [
  { bg: "bg-red-500", name: "red-500" },
  { bg: "bg-orange-500", name: "orange-500" },
  { bg: "bg-amber-500", name: "amber-500" },
  { bg: "bg-yellow-500", name: "yellow-500" },
  { bg: "bg-lime-500", name: "lime-500" },
  { bg: "bg-green-500", name: "green-500" },
  { bg: "bg-emerald-500", name: "emerald-500" },
  { bg: "bg-teal-500", name: "teal-500" },
  { bg: "bg-cyan-500", name: "cyan-500" },
  { bg: "bg-sky-500", name: "sky-500" },
  { bg: "bg-blue-500", name: "blue-500" },
  { bg: "bg-indigo-500", name: "indigo-500" },
  { bg: "bg-violet-500", name: "violet-500" },
  { bg: "bg-purple-500", name: "purple-500" },
  { bg: "bg-fuchsia-500", name: "fuchsia-500" },
  { bg: "bg-pink-500", name: "pink-500" },
  { bg: "bg-rose-500", name: "rose-500" },
  { bg: "bg-slate-500", name: "slate-500" },
];

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
    <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
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
          className="mb-2 w-full rounded-full px-4 py-2 text-black"
        />

        <p className="text-white">Category Color</p>
        <input
          disabled
          type="text"
          placeholder="Category Color"
          value={color}
          className={`w-full rounded-full px-4 py-2 text-black bg-${color}`}
        />

        <div className="my-2 flex flex-wrap justify-center gap-1">
          {colors.map((color) => (
            <input
              key={color.name}
              type="button"
              onClick={() => setColor(color.name)}
              className={`h-6 w-6 cursor-pointer rounded-md border border-white ${color.bg}`}
            />
          ))}
        </div>

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
