"use client";

import type { User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuestionStore } from "~/store/questionStore";
import { api } from "~/trpc/react";

export function UserCard(props: User) {
  const { id, currentStreak, name, days, longestStreak, month } = props;

  return (
    <Link href={`/${id}`}>
      <div className={`m-4 rounded-lg bg-white p-1 shadow-lg transition`}>
        <div
          className={`box-border flex h-32 w-52 flex-col items-center justify-center gap-2 rounded-md bg-blue-800 p-4 text-center text-slate-200`}
        >
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-md h-0 font-semibold opacity-30">User</p>
        </div>
      </div>
    </Link>
  );
}
