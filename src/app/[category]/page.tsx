"use client";

import QuestionCard from "~/components/user-page/cards/question-card";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { TallyCounters } from "~/components/user-page/tally-counters";
import { openCard, successFanfare } from "~/shared/assets";
import { useQuestionStore } from "~/store/questionStore";
import { api } from "~/trpc/react";
import type { DatedQuestionCard } from "~/shared/types";
import { useRouter } from "next/navigation";
import { useStreakStore } from "~/store/streakStore";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("~/components/user-page/calendar"), {
  ssr: false, // This ensures the component is only rendered on the client
});

export default function Page({ params }: { params: { category: string } }) {
  const { getPendingQuestions, updateQuestion } = useQuestionStore();

  const [dueFlashcards, setDueFlashcards] = useState<
    DatedQuestionCard[] | undefined
  >(undefined);

  const { data: questions } = api.question.getAll.useQuery({
    category: params.category,
  });

  const router = useRouter();

  const { getTodayScore } = useStreakStore();

  function refreshCards() {
    if (!questions) return;

    setDueFlashcards(getPendingQuestions(questions));
  }

  useEffect(() => {
    refreshCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  useEffect(() => {
    if (!dueFlashcards) return;

    if (dueFlashcards.length === 0) {
      successFanfare.play();
    } else {
      openCard.play();
    }
  }, [dueFlashcards]);

  const topStyles = {
    titleTextSize:
      !dueFlashcards || dueFlashcards.length === 0 ? "text-3xl" : "text-xl",
    tallyCounterWidth: !dueFlashcards || dueFlashcards.length === 0 ? 50 : 35,
    tallyCounterTextSize:
      !dueFlashcards || dueFlashcards.length === 0 ? "text-5xl" : "text-3xl",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-slate-950">
      <div
        className="m-4 cursor-pointer select-none rounded-lg bg-sky-200 px-8 py-4 text-center shadow-md transition hover:scale-110 sm:w-4/12 md:w-5/12"
        onClick={() => router.push("/")}
      >
        <h2 className={topStyles.titleTextSize}>
          {dueFlashcards
            ? dueFlashcards.length === 0
              ? "We're done for today!"
              : `Today's flashcards: ${dueFlashcards.length}`
            : "Loading..."}
        </h2>
        {getTodayScore().pyd && (
          <div
            className={
              "mt-2 flex w-full items-center gap-3 " +
              topStyles.tallyCounterTextSize
            }
          >
            <div className="flex flex-1 justify-end gap-3 text-emerald-400">
              <TallyCounters
                size={topStyles.tallyCounterWidth}
                reverse
                count={getTodayScore().rgt}
              />
              <Check
                width={topStyles.tallyCounterWidth}
                height={topStyles.tallyCounterWidth}
              />
            </div>
            <div className="flex flex-1 justify-start gap-3 text-red-400">
              <X
                width={topStyles.tallyCounterWidth}
                height={topStyles.tallyCounterWidth}
              />
              <TallyCounters
                size={topStyles.tallyCounterWidth}
                count={getTodayScore().wrg}
              />
            </div>
          </div>
        )}
      </div>
      {dueFlashcards && dueFlashcards.length > 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          <QuestionCard
            key={dueFlashcards[0]!.id}
            questionCard={dueFlashcards[0]!}
            updateDueDate={updateQuestion}
            refreshCards={refreshCards}
          />
        </div>
      )}

      {dueFlashcards && dueFlashcards.length === 0 && <Calendar />}
    </main>
  );
}
