"use client";

import { CrownIcon, Loader2Icon, PlayIcon } from "lucide-react";
import { useUserStore } from "~/store/userStore";
import { redirect } from "next/navigation";
import { useDatedUserQuestions } from "~/hooks/useDatedUserQuestions";
import Link from "next/link";
import { UserCardAction } from "~/components/user-page/cards/user-card-action";
import { useDatedUserHistory } from "~/hooks/useDatedUserHistory";
import clsx from "clsx";

export default function UserHome() {
  const { user, setUser } = useUserStore();
  const pendingQuestions = useDatedUserQuestions(user?.id);
  const userHistory = useDatedUserHistory(user?.id);

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
      <UserCardAction user={user} onClick={handleBackToProfileSelect} />

      <Link href={"/play"}>
        <div className="flex h-16 w-72 items-center justify-between rounded-md border-4 border-white bg-green-400 p-4 text-white shadow-2xl transition hover:scale-110 active:scale-95">
          <PlayIcon className="fill-white" />
          <span className="text-xl font-bold">Comenzar</span>
          <span className="text-xl">({pendingQuestions?.length})</span>
        </div>
      </Link>

      <div className="m-4 flex w-72 flex-col gap-4 rounded-md border-4 border-white bg-yellow-500 p-4  text-white shadow-2xl">
        <div className="flex items-center justify-around font-bold">
          <CrownIcon className="fill-white" />
          <span className="text-xl">{user.longestStreak}</span>
        </div>

        {userHistory !== undefined && (
          <div className="flex justify-between">
            {userHistory.map((uh, idx) => (
              <div
                className={clsx([
                  "flex h-12 w-12 flex-col items-center justify-center rounded-md bg-black/30",
                  {
                    "bg-green-500":
                      user.currentStreak - (userHistory.length - idx) >= 0,
                  },
                ])}
                key={idx}
              >
                <span className="text-xs">
                  {uh.date.month}-{uh.date.day}
                </span>
                <span className="font-bold">{uh.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
