import { api } from "~/trpc/server";
import { CardSetCard } from "~/components/user-page/cards/cardset-card";

export default async function UserHome() {
  const cardsets = await api.cardset.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-slate-950 sm:flex-row sm:flex-wrap">
      {cardsets?.map((cardset) => (
        <CardSetCard key={cardset.id} {...cardset} />
      ))}
    </main>
  );
}
