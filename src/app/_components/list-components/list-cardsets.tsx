import { api } from "~/trpc/server";
import CreateCardSet from "../create-components/create-cardset";
import SimpleView from "../simple-view";
import { type PartialMPP } from "~/types/magic-page-types";

export default async function ListCardSets(props: PartialMPP) {
  const { selectedCardsetId } = props;
  const cardsets = await api.cardset.getAll.query();

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      {cardsets && (
        <p>
          {cardsets.length} card set{cardsets.length > 1 ? "s" : ""}
        </p>
      )}

      <div className="my-2 flex flex-1 select-none flex-col gap-1">
        {cardsets?.map((cardset) => (
          <SimpleView
            baseUrl={`/admin/`}
            id={cardset.id}
            name={cardset.name}
            selection={selectedCardsetId}
            key={cardset.id}
            activeColor="bg-purple-500 text-white"
            inactiveColor="bg-purple-300"
            hasChildren
          />
        ))}
      </div>

      <CreateCardSet />
    </div>
  );
}
