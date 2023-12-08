import { api } from "~/trpc/server";
import CreateCategoryButton from "../create-components/create-category";
import SimpleView from "../simple-view";
import { type PartialMPP } from "~/shared/types";
import DetailedView from "../detailed-view";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

type ListCategoriesProps = PartialMPP & {
  selectedCardsetId: string;
  isActive: boolean;
};

export default async function ListCategories(props: ListCategoriesProps) {
  const { selectedCardsetId, selectedCategoryId, isActive } = props;

  const categories = await api.category.getAll.query({
    cardset: selectedCardsetId,
  });

  const selectedCardset = await api.cardset.findOne.query({
    id: selectedCardsetId,
  });

  return (
    <div
      className={`overflow-x-hidden bg-slate-200 transition
      ${isActive ? "flex-1" : "w-10"}`}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      {isActive && (
        <div className="flex h-full flex-col px-4 py-4">
          <DetailedView data={selectedCardset} type="cardset" />

          {categories && (
            <p>
              {categories.length} categor{categories.length > 1 ? "ies" : "y"}{" "}
              in card set
            </p>
          )}

          <div className="my-2 flex flex-1 select-none flex-col gap-1 overflow-y-auto">
            {categories?.map((category) => (
              <SimpleView
                baseUrl={`/admin/${selectedCardsetId}/`}
                id={category.id}
                name={category.name}
                selection={selectedCategoryId}
                key={category.id}
                activeColor="bg-violet-500 text-white"
                inactiveColor="bg-violet-300"
                dotColor={`bg-${category.color}-500`}
                hasChildren
              />
            ))}
          </div>

          <CreateCategoryButton selectedCardsetId={selectedCardsetId} />
        </div>
      )}
      {!isActive && (
        <Link
          className="flex h-5/6 w-full cursor-pointer gap-4 p-2 text-xl font-bold transition hover:bg-slate-400"
          style={{ textOrientation: "sideways", writingMode: "vertical-rl" }}
          href={`/admin/${selectedCardsetId}`}
        >
          <ArrowBigLeft />
          <span>
            Category:{" "}
            {categories.find((item) => item.id === selectedCategoryId)?.name}
          </span>
        </Link>
      )}
    </div>
  );
}
