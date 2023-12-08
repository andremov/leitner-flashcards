import { api } from "~/trpc/server";
import CreateCardSet from "../create-components/create-cardset";
import SimpleView from "../simple-view";
import { type PartialMPP } from "~/shared/types";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

type ListCardSetsProps = Pick<PartialMPP, "selectedCardsetId"> & {
  isActive: boolean;
};

export default async function ListCardSets(props: ListCardSetsProps) {
  const { selectedCardsetId, isActive } = props;
  const cardsets = await api.cardset.getAll.query();

  return (
    <div
      className={`overflow-x-hidden bg-slate-200 transition
      ${isActive ? "flex-1" : "w-10"}`}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      {isActive && (
        <div className="flex h-full flex-col px-4 py-4">
          {cardsets && (
            <p>
              {cardsets.length} card set{cardsets.length > 1 ? "s" : ""}
            </p>
          )}

          <div className="my-2 flex flex-1 select-none flex-col gap-1 overflow-y-auto">
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
      )}
      {!isActive && (
        <Link
          className="flex h-5/6 w-full cursor-pointer gap-4 p-2 text-xl font-bold transition hover:bg-slate-400"
          style={{ textOrientation: "sideways", writingMode: "vertical-rl" }}
          href={`/admin`}
        >
          <ArrowBigLeft />
          <span>
            Cardset:{" "}
            {cardsets.find((item) => item.id === selectedCardsetId)?.name}
          </span>
        </Link>
      )}
    </div>
  );
}
