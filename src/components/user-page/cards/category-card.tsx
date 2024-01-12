"use client";

import type { Category } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuestionStore } from "~/store/questionStore";
import { api } from "~/trpc/react";

export function CategoryCard(props: Category) {
  const { id, name, color } = props;
  const { getPendingCount } = useQuestionStore();

  const [dueFlashcardsCount, setDueFlashcardsCount] = useState<
    number | undefined
  >(undefined);

  const { data: questions } = api.question.getAll.useQuery({
    category: id,
  });

  function refreshCards() {
    if (!questions) return;

    setDueFlashcardsCount(getPendingCount(questions.map((q) => q.id)));
  }

  useEffect(() => {
    refreshCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  return (
    <Link href={`/${id}`}>
      <div
        className={`m-4 rounded-lg bg-white p-1 shadow-lg transition  ${
          dueFlashcardsCount === 0
            ? "scale-90 opacity-50"
            : "hover:scale-110 hover:shadow-2xl"
        }`}
      >
        <div
          className={`box-border flex h-32 w-52 flex-col items-center justify-center gap-2 rounded-md bg-${color}-300 p-4 text-center text-slate-800`}
        >
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-md h-0 font-semibold opacity-30">Category</p>
        </div>
      </div>
    </Link>
  );
}
