import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/server";
import CreateCategoryButton from "../create-components/create-category";

export default async function ListCategories(props: {
  selectedCardsetId?: string;
  selectedCategoryId?: string;
}) {
  const { selectedCardsetId, selectedCategoryId } = props;

  const categories = await api.category.getAll.query({
    cardset: selectedCardsetId ?? undefined,
  });

  if (!selectedCardsetId) return <></>;

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
                href={`/admin/${selectedCardsetId}/${category.id}`}
                className="w-6 rounded-sm transition hover:bg-black/20"
              >
                <ExternalLink className="mx-auto w-5" />
              </Link>
              <Link
                href={`/admin/${selectedCardsetId}/${category.id}/edit`}
                className="w-6 rounded-sm transition hover:bg-black/20"
              >
                <Pencil className="mx-auto w-5" />
              </Link>
              <Link
                href={`/admin/${selectedCardsetId}/${category.id}/delete`}
                className="w-6 rounded-sm transition hover:bg-red-500/40"
              >
                <Trash className="mx-auto w-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <CreateCategoryButton {...props} />
    </div>
  );
}
