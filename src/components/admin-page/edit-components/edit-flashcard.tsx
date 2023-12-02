"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type PartialMPP } from "~/shared/types";

export default function EditFlashcard(props: PartialMPP) {
  const { selectedFlashcardId, selectedCardsetId, editingModel } = props;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const { data: editingFlashcard } = api.flashcard.findOne.useQuery({
    id: selectedFlashcardId!,
  });

  const { data: availCategories } = api.category.getAll.useQuery({
    cardset: selectedCardsetId,
  });

  useEffect(() => {
    if (editingFlashcard) {
      setTitle(editingFlashcard.title);
      setDescription(editingFlashcard.description);
      setCategory(editingFlashcard.category);
    }
  }, [editingFlashcard]);

  const updateFlashcard = api.flashcard.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  if (!editingFlashcard || editingModel !== "flashcard") return <></>;

  return (
    <div className="flex flex-[2_2_0%] flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateFlashcard.mutate({
            id: editingFlashcard.id,
            title: title,
            description: description,
            category: category,
          });
        }}
        className="my-2 flex w-8/12 select-none flex-col gap-1 rounded-lg bg-slate-500 p-4 "
      >
        <p className="text-white">Flashcard Title</p>
        <input
          type="text"
          placeholder="Flashcard Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 w-full rounded-full px-4 py-2 text-black"
        />

        <p className="text-white">Flashcard Description</p>
        <textarea
          placeholder="Flashcard Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl px-4 py-2 text-black"
        />

        <p className="text-white">Flashcard Category</p>
        <select
          placeholder="Flashcard Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl px-4 py-2 text-black"
        >
          {availCategories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="mt-4 rounded-full bg-white/50 px-10 py-3 font-semibold transition hover:bg-white/80"
          disabled={updateFlashcard.isLoading}
        >
          {updateFlashcard.isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
