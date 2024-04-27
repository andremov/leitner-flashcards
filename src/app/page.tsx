import { UserCard } from "~/components/user-page/cards/user-card";
import { CategoryCard } from "~/components/user-page/cards/category-card";
import { TutorialCard } from "~/components/tutorial-page/tutorial-card";
import { api } from "~/trpc/server";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("~/components/user-page/calendar"), {
  ssr: false, // This ensures the component is only rendered on the client
});

export default async function UserHome() {
  const categories = await api.category.getAll.query({});
  const users = await api.user.getAll.query({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-slate-950">
      <div className="flex flex-col justify-center sm:flex-row sm:flex-wrap">
        <TutorialCard />

        {users?.map((user) => <UserCard key={user.id} {...user} />)}

        {categories?.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>

      <Calendar />
    </main>
  );
}
