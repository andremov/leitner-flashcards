"use client";

import { InfoIcon, Loader2 } from "lucide-react";
import { NewUserCard, SkeletonUserCard, UserCard } from "../cards/user-card";
import { useDatedUsers } from "~/hooks";

export function UserView() {
  const users = useDatedUsers();

  if (!users) {
    return (
      <div className="flex flex-wrap gap-[1.155rem]">
        {Array.from({ length: 15 }).map((_, idx) => (
          <SkeletonUserCard key={idx} />
        ))}

        <div className="absolute left-0 top-1/2 flex w-full flex-col items-center gap-2">
          <Loader2
            className="animate-spin text-slate-400"
            width={50}
            height={50}
          />
          <h2 className="text-2xl font-bold text-slate-400">Loading...</h2>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-wrap gap-[1.155rem]">
        <NewUserCard />

        <div className="absolute left-0 top-1/2 flex w-full flex-col items-center gap-2">
          <InfoIcon className="text-slate-400" width={40} height={40} />
          <h2 className="text-lg font-bold text-slate-400">No users.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-[1.155rem]">
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}

      <NewUserCard />
    </div>
  );
}
