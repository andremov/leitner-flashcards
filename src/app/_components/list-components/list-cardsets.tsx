import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/server";
import { api as ReactApi } from "~/trpc/react";
import CreateObjectButton from "../create-components/create-object";
import { CardSet } from "@prisma/client";

export default async function ListCardSets(props: {
  selectedCardsetId?: string;
}) {
  const { selectedCardsetId } = props;
  const cardsets = await api.cardset.getAll.query();

  return (
    <div className="flex w-full flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      {cardsets && <p>{cardsets.length} card sets</p>}

      <div className="my-2 flex flex-1 select-none flex-col gap-1">
        {cardsets?.map((cardset) => (
          <div
            key={cardset.id}
            className={`rounded-md px-4 py-2 transition ${
              selectedCardsetId === cardset.id
                ? "bg-purple-500 text-white"
                : "bg-purple-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{cardset.name}</span>
              <div className="flex gap-2">
                <Link
                  href={`/admin/${cardset.id}`}
                  className="w-6 rounded-sm transition hover:bg-black/20"
                >
                  <ExternalLink className="mx-auto w-5" />
                </Link>
                <Link
                  href={`/admin/${cardset.id}/edit`}
                  className="w-6 rounded-sm transition hover:bg-black/20"
                >
                  <Pencil className="mx-auto w-5" />
                </Link>
                <Link
                  href={`/admin/${cardset.id}/delete`}
                  className="w-6 rounded-sm transition hover:bg-red-500/40"
                >
                  <Trash className="mx-auto w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateObjectButton
        buttonText="Create a card set"
        defaultObject={{ name: "New card set" }}
        model={"cardset"}
      />
    </div>
  );
}
