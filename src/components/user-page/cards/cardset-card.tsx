import { type CardSet } from "@prisma/client";
import Link from "next/link";

export function CardSetCard(props: CardSet) {
  const { id, name } = props;

  return (
    <Link href={`/${id}`}>
      <div className="m-4 cursor-pointer rounded-lg bg-white p-1 shadow-lg transition hover:scale-110 hover:shadow-2xl">
        <div className="box-border flex h-32 w-52 flex-col items-center justify-center gap-2 rounded-md bg-emerald-300 p-4 text-center text-slate-800">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-md h-0 font-semibold opacity-30">Card set</p>
        </div>
      </div>
    </Link>
  );
}
