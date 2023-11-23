"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type PartialMPP } from "~/types/magic-page-types";

export default function EditFlashcard(props: PartialMPP) {
  const { selectedFlashcardId, editingModel } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data: editingFlashcard } = api.flashcard.findOne.useQuery({
    id: selectedFlashcardId ?? "",
  });

  useEffect(() => {
    if (editingFlashcard) {
      setTitle(editingFlashcard.title);
      setDescription(editingFlashcard.description);
    }
  }, [editingFlashcard]);

  const updateFlashcard = api.flashcard.update.useMutation();

  if (!editingFlashcard || editingModel !== "flashcard") return <></>;

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateFlashcard.mutate({
            id: editingFlashcard.id,
            title: title,
            description: description,
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
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <p className="text-white">Flashcard Description</p>
        <input
          multiple
          type="text"
          placeholder="Flashcard Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

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
