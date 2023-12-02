"use client";

import useCardsetStorage from "~/components/user-page/hooks/useCardsetStorage";
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
  const [dueFlashcards, updateDueDate, refreshCards] = useCardsetStorage(
    params.cardset,
  );

  const topStyles = {
    titleTextSize: dueFlashcards.length === 0 ? "text-3xl" : "text-xl",
    tallyCounterWidth: dueFlashcards.length === 0 ? 50 : 35,
    tallyCounterTextSize: dueFlashcards.length === 0 ? "text-5xl" : "text-3xl",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-slate-950">
      <div className="m-4 select-none rounded-lg bg-sky-200 px-8 py-4 text-center shadow-md sm:w-4/12 md:w-5/12">
        <h2 className={topStyles.titleTextSize}>
          {dueFlashcards.length === 0
            ? "We're done for today!"
            : `Today's flashcards: ${dueFlashcards.length}`}
        </h2>
        {!!(score.right || score.wrong) && (
          <div
            className={
              "mt-2 flex w-full items-center gap-3 " +
              topStyles.tallyCounterTextSize
            }
          >
            <div className="flex flex-1 justify-end gap-3 text-emerald-400 transition hover:text-emerald-500">
              <TallyCounters
                size={topStyles.tallyCounterWidth}
                reverse
                count={score.right}
              />
              <Check
                width={topStyles.tallyCounterWidth}
                height={topStyles.tallyCounterWidth}
              />
            </div>
            <div className="flex flex-1 justify-start gap-3 text-red-400 transition hover:text-red-500">
              <X
                width={topStyles.tallyCounterWidth}
                height={topStyles.tallyCounterWidth}
              />
              <TallyCounters
                size={topStyles.tallyCounterWidth}
                count={score.wrong}
              />
            </div>
          </div>
        )}
      </div>

      {dueFlashcards.length > 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          <QuestionCard
            key={dueFlashcards[0]!.id}
            questionCard={dueFlashcards[0]!}
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
        </div>
      )}
    </main>
  );
}
