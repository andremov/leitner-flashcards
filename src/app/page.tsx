"use client";

import { UserCardAction } from "~/components/user-page/cards/user-card-action";
import { useDatedUsers } from "~/hooks";
import { Loader2Icon } from "lucide-react";
import { useUserStore } from "~/store/userStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import type { UserType } from "~/shared/types";

export default function Home() {
  const users = useDatedUsers();
  const { userId, user, setUser } = useUserStore();

  useEffect(() => {
    if (userId && users !== undefined) {
      const user = users.find((u) => u.id === userId);

      if (user !== undefined) {
        setUser(user);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, users, users?.length]);

  if (user) {
    redirect("/menu");
  }

  function handlePickUser(user: UserType) {
    setUser(user);
  }

  if (users === undefined) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-200 text-black/60">
        <Loader2Icon className="animate-spin" width={40} height={40} />
        <span className="text-xl font-bold">Loading...</span>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-200 py-10 text-slate-950">
      <h2 className="text-2xl font-bold">Elegir Perfil</h2>

      <div className="flex max-w-[70rem] flex-col items-center justify-center gap-2 md:flex-row md:flex-wrap">
        {users.map((u) => (
          <UserCardAction
            key={u.id}
            user={u}
            onClick={() => handlePickUser(u)}
          />
        ))}
      </div>

      <div></div>
    </main>
  );
}
