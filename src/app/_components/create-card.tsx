"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateCard() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cardset, setCardset] = useState("");

  const createCard = api.flashcard.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setTitle("");
      setDescription("");
      setCategory("");
      setCardset("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createCard.mutate({
          title,
          description,
          category,
          set: cardset,
        });
      }}
      className="flex flex-col gap-2 rounded-2xl bg-slate-700 p-4"
    >
      <input
        type="text"
        placeholder="Concept Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        multiple
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="h-20 w-full rounded-3xl px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="Card Set"
        value={cardset}
        onChange={(e) => setCardset(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/50 px-10 py-3 font-semibold transition hover:bg-white/80"
        disabled={createCard.isLoading}
      >
        {createCard.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
