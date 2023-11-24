import { api } from "~/trpc/react";
import { CardSetCard } from "~/components/user-page/cards/cardset-card";

export default function UserHome() {
  const { data: cardsets } = api.cardset.getAll.useQuery();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200 text-slate-950">
      {cardsets?.map((cardset) => (
        <CardSetCard key={cardset.id} {...cardset} />
      ))}
    </main>
  );
}
