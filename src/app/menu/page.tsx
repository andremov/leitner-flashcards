"use client";

import { CrownIcon, Loader2Icon, PlayIcon } from "lucide-react";
import { useUserStore } from "~/store/userStore";
import { redirect } from "next/navigation";
import { useDatedUserQuestions } from "~/hooks/useDatedUserQuestions";
import Link from "next/link";
import { UserCardAction } from "~/components/user-page/cards/user-card-action";
import clsx from "clsx";
import { StreakDetails } from "~/components/user-page/streak-details";

export default function UserHome() {
  const { user, setUser } = useUserStore();
  const pendingQuestions = useDatedUserQuestions(user?.id);

  if (!user) {
    redirect("/");
  }

  if (pendingQuestions == undefined) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-200 text-black/60">
        <Loader2Icon className="animate-spin" width={40} height={40} />
        <span className="text-xl font-bold">Loading...</span>
      </main>
    );
  }

  function handleBackToProfileSelect() {
    setUser(undefined);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-200 text-slate-950">
      <div>
        <UserCardAction user={user} onClick={handleBackToProfileSelect} />
        <StreakDetails />
      </div>

      <Link href={"/play"}>
        <div className="flex h-16 w-72 items-center justify-between rounded-md border-4 border-white bg-green-500 p-4 text-white shadow-2xl transition hover:scale-110 active:scale-95">
          <PlayIcon className="fill-white" />
          <span className="text-xl font-bold">Comenzar</span>
          <span className="text-xl">({pendingQuestions?.length})</span>
        </div>
      </Link>

      <div></div>
    </main>
  );
}
