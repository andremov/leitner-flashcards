"use client";

import type { User } from "@prisma/client";
import { CrownIcon, Dot, PlusCircleIcon, Stars, UserIcon } from "lucide-react";
import { useAdminStore } from "~/store/adminStore";
import { AdminModal } from "~/store/slices/adminSlice/adminSlice.types";

export function UserCard({ user }: { user: User }) {
  return (
    <div
      className={`bg-${user.color}-500 flex h-40 w-64 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-4 border-white text-white shadow-2xl transition hover:scale-95 active:scale-90`}
    >
      <div className="flex items-center gap-2">
        <UserIcon width={35} height={35} />
        <span className="text-xl">{user.name}</span>
      </div>

      <div className="flex items-center gap-2 text-white/70">
        <CrownIcon />
        <span className="text-xl">{user.longestStreak}</span>
        <Dot />

        <Stars />
        <span className="text-xl">{user.currentStreak}</span>
      </div>
    </div>
  );
}

export function NewUserCard() {
  const { setActiveModal } = useAdminStore();

  function setCreateUserModal() {
    setActiveModal(AdminModal.CREATE_USER);
  }

  return (
    <div
      className="flex h-40 w-64 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-4 border-white bg-green-400 text-white shadow-2xl transition hover:scale-95 active:scale-90"
      onClick={setCreateUserModal}
    >
      <PlusCircleIcon width={35} height={35} />
      <span className="text-xl">New user</span>
    </div>
  );
}

export function SkeletonUserCard() {
  return <div className="h-40 w-64 animate-pulse rounded-lg bg-slate-600/20" />;
}
