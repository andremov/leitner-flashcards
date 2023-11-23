"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type PartialMPP } from "~/types/magic-page-types";

export default function EditCardSet(props: PartialMPP) {
  const { selectedCardsetId, editingModel } = props;
  const router = useRouter();

  const [name, setName] = useState("");

  const { data: editingCardset } = api.cardset.findOne.useQuery({
    id: selectedCardsetId ?? "",
  });

  useEffect(() => {
    if (editingCardset) setName(editingCardset.name);
  }, [editingCardset]);

  const updateCardSet = api.cardset.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  if (!editingCardset || editingModel !== "cardset") return <></>;

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCardSet.mutate({
            id: editingCardset.id,
            name,
          });
        }}
        className="my-2 flex w-8/12 select-none flex-col gap-1 rounded-lg bg-slate-500 p-4 "
      >
        <p className="text-white">Cardset Name</p>
        <input
          type="text"
          placeholder="Cardset Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <button
          type="submit"
          className="mt-4 rounded-full bg-white/50 px-10 py-3 font-semibold transition hover:bg-white/80"
          disabled={updateCardSet.isLoading}
        >
          {updateCardSet.isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
