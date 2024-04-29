"use client";

import { Temporal } from "@js-temporal/polyfill";
import clsx from "clsx";
import { Sparkles, UserIcon } from "lucide-react";
import type { UserType } from "~/shared/types";

export function UserCard({ user }: { user?: UserType }) {
  if (!user) {
    return <></>;
  }
  const today = Temporal.Now.plainDateISO();

  const comparison = today.toString() === user.lastPlayedAt.toString();

  return (
    <div
      className={`m-4 box-border flex h-16 w-72 select-none items-center justify-between gap-2 rounded-md border-4 border-white shadow-lg bg-${user.color}-500 p-4 text-center text-white`}
    >
      <div className="flex items-center gap-2">
        <UserIcon className="fill-white" />
        <span className="text-2xl font-bold">{user.name}</span>
      </div>

      <div
        className={clsx([
          "flex items-center gap-2",
          {
            "text-yellow-400": comparison,
          },
        ])}
      >
        <Sparkles />
        <span className="text-xl font-bold">{user.currentStreak}</span>
      </div>
    </div>
  );
}
