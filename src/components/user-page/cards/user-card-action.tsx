"use client";

import type { UserType } from "~/shared/types";
import { UserCard } from "./user-card";

export function UserCardAction({
  user,
  onClick,
}: {
  user?: UserType;
  onClick: () => void;
}) {
  if (!user) {
    return <></>;
  }

  return (
    <div
      className={`cursor-pointer transition hover:scale-105 active:scale-95`}
      onClick={onClick}
    >
      <UserCard user={user} />
    </div>
  );
}
