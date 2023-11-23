"use client";
import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function ListCategories() {
  const utils = api.useUtils();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCardsetId = searchParams.get("cardset");
  const selectedCategoryId = searchParams.get("category");

  const { data: categories } = api.category.getAll.useQuery({
    cardset: selectedCardsetId ?? undefined,
  });

  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      router.refresh();
      void utils.category.getAll.invalidate();
    },
  });

  if (!selectedCardsetId) return <></>;

  const createDraftCategory = () =>
    createCategory.mutate({
      name: "New category",
      cardset: selectedCardsetId,
      color: "emerald-500",
    });

  return (
    <div className="flex w-full flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      {categories && <p>{categories.length} categories in card set</p>}

      <div className="my-2 flex flex-1 select-none flex-col gap-1">
        {categories?.map((category) => (
          <div
            key={category.id}
            className={`flex items-center justify-between rounded-md px-4 py-2 transition ${
              selectedCategoryId === category.id
                ? "bg-violet-500 text-white"
                : "bg-violet-300"
            }`}
          >
            <span>{category.name}</span>
            <div className="flex gap-2">
              <Link
                href={`/admin?cardset=${selectedCardsetId}&category=${category.id}`}
                className="w-6 rounded-sm transition hover:bg-black/20"
              >
                <ExternalLink className="mx-auto w-5" />
              </Link>
              <button className="w-6 rounded-sm transition hover:bg-black/20">
                <Pencil className="mx-auto w-5" />
              </button>
              <button className="w-6 rounded-sm transition hover:bg-red-500/40">
                <Trash className="mx-auto w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={createDraftCategory}
        className="h-12 w-full rounded-md bg-emerald-600 px-4 py-1 text-white transition hover:bg-emerald-500"
      >
        Create a category
      </button>
    </div>
  );
}
