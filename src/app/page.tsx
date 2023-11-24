import { api } from "~/trpc/server";
import { CardSetCard } from "./_components/user-page/cards/cardset-card";

export default async function UserHome() {
  const cardsets = await api.cardset.getAll.query();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200 text-slate-950">
      {cardsets.map((cardset) => (
        <CardSetCard key={cardset.id} {...cardset} />
      ))}
    </main>
  );
}
