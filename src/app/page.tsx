"use client";

import { CategoryCard } from "~/components/user-page/cards/category-card";
import { TutorialCard } from "~/components/tutorial-page/tutorial-card";
import { api } from "~/trpc/react";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("~/components/user-page/calendar"), {
  ssr: false, // This ensures the component is only rendered on the client
});

export default function UserHome() {
  const { data: categories } = api.category.getAll.useQuery({});

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-200 text-slate-950">
      <div className="flex flex-col justify-center sm:flex-row sm:flex-wrap">
        <TutorialCard />

        {categories?.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>

      <Calendar />
    </main>
  );
}
