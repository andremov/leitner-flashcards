"use client";

import useLocalStorage from "~/components/user-page/hooks/useLocalStorage";
import QuestionCard from "~/components/user-page/cards/question-card";
import { useReducer } from "react";
import { Check, X } from "lucide-react";
import { TallyCounters } from "~/components/user-page/tally-counters";
// import { RefreshCw } from "lucide-react";

function reducer(state: { right: number; wrong: number }, right: boolean) {
  return {
    right: state.right + +right,
    wrong: state.wrong + ((+right + 1) % 2),
  };
}

export default function Page({ params }: { params: { cardset: string } }) {
  const [score, setScore] = useReducer(reducer, { right: 0, wrong: 0 });
  const [dueFlashcards, updateDueDate, refreshCards] = useLocalStorage(
    params.cardset,
  );

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-200 text-slate-950">
      <div className="m-4 w-3/12 select-none rounded-lg bg-sky-200 px-8 py-4 text-center shadow-md">
        <h2 className="text-xl">
          Today&apos;s flashcards: {dueFlashcards.length}
        </h2>
        <div className="mt-2 flex w-full items-center gap-3 text-3xl">
          <div className="flex flex-1 justify-end gap-3 text-emerald-400 transition hover:text-emerald-500">
            <TallyCounters width={35} height={35} reverse count={score.right} />
            <Check width={35} height={35} />
          </div>
          <div className="flex flex-1 justify-start gap-3 text-red-400 transition hover:text-red-500">
            <X width={35} height={35} />
            <TallyCounters width={35} height={35} count={score.wrong} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        {dueFlashcards.length > 0 ? (
          <>
            <QuestionCard
              key={dueFlashcards[0]!.id}
              flashcard={dueFlashcards[0]!}
              updateDueDate={updateDueDate}
              refreshCards={refreshCards}
              handleModifyScore={setScore}
            />
            {/* <button
              className="rounded-md border-2 border-black bg-white px-4 py-2"
              onClick={() => refreshCards()}
            >
              <RefreshCw />
            </button> */}
          </>
        ) : (
          <p>We&apos;re done!</p>
        )}
      </div>
    </main>
  );
}
