"use client";

import { Loader2Icon, Pencil, PlusIcon } from "lucide-react";
import { api } from "~/trpc/react";
import { DailyWordCard } from "~/components/user-page/cards/daily-word-card";

export default function Home() {
  const { data: words } = api.dailyWord.getAll.useQuery({});

  if (words === undefined) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-200 text-black/60">
        <Loader2Icon className="animate-spin" width={40} height={40} />
        <span className="text-xl font-bold">Loading...</span>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-200 py-10 text-slate-950">
      <h2 className="text-2xl font-bold">Palabras del dia</h2>

      <div className="flex max-w-[70rem] flex-col items-center justify-center gap-2 md:flex-row md:flex-wrap">
        {words.map((w) => (
          <DailyWordCard key={w.id} word={w} />
        ))}
      </div>

      <div>
        <button className="flex h-16 w-72 items-center justify-between rounded-md border-4 border-white bg-green-500 p-4 text-white shadow-2xl transition hover:scale-110 active:scale-95">
          <Pencil />
          <span className="text-xl font-bold">Nuevo</span>
          <span></span>
        </button>
      </div>
    </main>
  );
}
