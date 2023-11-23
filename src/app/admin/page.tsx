// "use client";

import { useSearchParams } from "next/navigation";
import ListCardSets from "../_components/list-components/list-cardsets";
import ListCategories from "../_components/list-components/list-categories";
import { api } from "~/trpc/react";
import ListFlashcards from "../_components/list-components/list-flashcards";
import EditCardSet from "../_components/edit-components/edit-cardset";
import DeleteCardSet from "../_components/delete-components/delete-cardset";
import EditCategory from "../_components/edit-components/edit-category";
import DeleteCategory from "../_components/delete-components/delete-category";

export default function AdminHome({ params }) {
  // const searchParams = useSearchParams();
  // const selectedCardsetId = searchParams.get("cardset");
  // const selectedCategoryId = searchParams.get("category");

  // const { data: selectedCardset } = api.cardset.findOne.useQuery({
  //   id: selectedCardsetId ?? "",
  // });

  // const { data: selectedCategory } = api.category.findOne.useQuery({
  //   id: selectedCategoryId ?? "",
  // });

  return (
    <main className="flex min-h-screen flex-col bg-slate-300">
      <div className="flex h-16 w-screen items-center justify-center">
        <div className="rounded-md border border-black bg-white px-4 py-2">
          / {selectedCardset && `${selectedCardset.name} /`}{" "}
          {selectedCategory && `${selectedCategory.name} /`}
        </div>
      </div>
      <div className="flex flex-1 items-stretch gap-1">
        <ListCardSets />
        <EditCardSet />
        <DeleteCardSet />

        <ListCategories />
        <EditCategory />
        <DeleteCategory />

        <ListFlashcards />
      </div>
    </main>
  );
}
