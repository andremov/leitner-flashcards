"use client";

import { api } from "~/trpc/react";
import { CardSetCard } from "~/components/user-page/cards/cardset-card";
import { TutorialCard } from "~/components/tutorial-page/tutorial-card";
import useStreakStorage from "~/components/user-page/hooks/useStreakStorage";
import Calendar from "~/components/user-page/calendar";

export default function UserHome() {
  const { data: cardsets } = api.cardset.getAll.useQuery();
  const [streakData, updateToday, refreshCalendar, streakLoaded] =
    useStreakStorage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-slate-950">
      <div className="flex flex-col sm:flex-row sm:flex-wrap">
        <TutorialCard />
        {cardsets?.map((cardset) => (
          <CardSetCard key={cardset.id} {...cardset} />
        ))}
      </div>
      {streakLoaded && <Calendar streakData={streakData} />}
    </main>
  );
}
