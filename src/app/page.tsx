import { CategoryCard } from "~/components/user-page/cards/category-card";
import { TutorialCard } from "~/components/tutorial-page/tutorial-card";
import Calendar from "~/components/user-page/calendar";
import { api } from "~/trpc/server";

export default async function UserHome() {
  const categories = await api.category.getAll.query({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-slate-950">
      <div className="flex flex-col sm:flex-row sm:flex-wrap">
        <TutorialCard />

        {categories?.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>

      <Calendar />
    </main>
  );
}
