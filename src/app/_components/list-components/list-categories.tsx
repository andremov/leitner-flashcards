import { api } from "~/trpc/server";
import CreateCategoryButton from "../create-components/create-category";
import SimpleView from "../simple-view";
import { type PartialMPP } from "~/types/magic-page-types";

export default async function ListCategories(props: PartialMPP) {
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
          <SimpleView
            baseUrl={`/admin/${selectedCardsetId}/`}
            id={category.id}
            name={category.name}
            selection={selectedCategoryId}
            key={category.id}
            activeColor="bg-violet-500 text-white"
            inactiveColor="bg-violet-300"
            hasChildren
          />
        ))}
      </div>

      <CreateCategoryButton {...props} />
    </div>
  );
}
