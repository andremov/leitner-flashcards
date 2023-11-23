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
          className="mb-2 w-full rounded-full px-4 py-2 text-black"
        />

        <p className="text-white">Category Color</p>
        <input
          disabled
          type="text"
          placeholder="Category Color"
          value={color}
          // onChange={(e) => setColor(e.target.value)}
          className={`w-full rounded-full px-4 py-2 text-black bg-${color}`}
        />

        <div className="my-2 flex flex-wrap justify-center gap-1">
          <input
            type="button"
            onClick={() => setColor("red-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-red-500"
          />
          <input
            type="button"
            onClick={() => setColor("orange-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-orange-500"
          />
          <input
            type="button"
            onClick={() => setColor("amber-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-amber-500"
          />
          <input
            type="button"
            onClick={() => setColor("yellow-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-yellow-500"
          />
          <input
            type="button"
            onClick={() => setColor("lime-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-lime-500"
          />
          <input
            type="button"
            onClick={() => setColor("green-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-green-500"
          />
          <input
            type="button"
            onClick={() => setColor("emerald-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-emerald-500"
          />
          <input
            type="button"
            onClick={() => setColor("teal-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-teal-500"
          />
          <input
            type="button"
            onClick={() => setColor("cyan-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-cyan-500"
          />
          <input
            type="button"
            onClick={() => setColor("sky-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-sky-500"
          />
          <input
            type="button"
            onClick={() => setColor("blue-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-blue-500"
          />
          <input
            type="button"
            onClick={() => setColor("indigo-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-indigo-500"
          />
          <input
            type="button"
            onClick={() => setColor("violet-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-violet-500"
          />
          <input
            type="button"
            onClick={() => setColor("purple-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-purple-500"
          />
          <input
            type="button"
            onClick={() => setColor("fuchsia-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-fuchsia-500"
          />
          <input
            type="button"
            onClick={() => setColor("pink-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-pink-500"
          />
          <input
            type="button"
            onClick={() => setColor("rose-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-rose-500"
          />
          <input
            type="button"
            onClick={() => setColor("slate-500")}
            className="h-6 w-6 cursor-pointer rounded-md border border-white bg-slate-500"
          />
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
