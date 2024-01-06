"use client";

import useCardsetStorage from "~/components/user-page/hooks/useCardsetStorage";
import QuestionCard from "~/components/user-page/cards/question-card";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { TallyCounters } from "~/components/user-page/tally-counters";
import { openCard, successFanfare } from "~/shared/assets";
import useStreakStorage from "~/components/user-page/hooks/useStreakStorage";
import Calendar from "~/components/user-page/calendar";

function reducer(state: ScoreType, right: boolean) {
  return {
    right: state.right + +right,
    wrong: state.wrong + ((+right + 1) % 2),
    remain: state.remain,
  };
}

type ScoreType = { right: number; wrong: number; remain: number };

const initScoreState = {
  right: 0,
  wrong: 0,
  remain: 0,
};

export default function Page({ params }: { params: { cardset: string } }) {
  const [score, setScore] = useState<ScoreType>(initScoreState);
  const [dueFlashcards, updateDueDate, refreshCards, cardsetLoaded] =
    useCardsetStorage(params.cardset);

  const scoreReducer = (right: boolean) => setScore(reducer(score, right));

  const [
    streakData,
    updateToday,
    refreshCalendar,
    todayStreakData,
    streakLoaded,
  ] = useStreakStorage();

  useEffect(() => {
    if (!todayStreakData) return;
    if (!cardsetLoaded) return;

    setScore({
      right: todayStreakData.right,
      wrong: todayStreakData.wrong,
      remain: dueFlashcards.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streakLoaded, cardsetLoaded]);

  useEffect(() => {
    if (!cardsetLoaded) return;

    if (dueFlashcards.length === 0) {
      successFanfare.play();
    } else {
      openCard.play();
    }
  }, [dueFlashcards.length, cardsetLoaded, streakLoaded]);

  useEffect(() => {
    if (!cardsetLoaded) return;

    if (streakLoaded) {
      updateToday(score.right, score.wrong, dueFlashcards.length);
      refreshCalendar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score.right, score.wrong, streakLoaded, cardsetLoaded]);

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
            <div className="flex flex-1 justify-end gap-3 text-emerald-400">
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
            <div className="flex flex-1 justify-start gap-3 text-red-400">
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
            handleModifyScore={scoreReducer}
          />
        </div>
      )}
      {dueFlashcards.length === 0 && streakLoaded && (
        <Calendar streakData={streakData} />
      )}

      <div className="m-2 select-none rounded-lg bg-slate-300 px-4 py-2 text-center shadow-sm">
        Storage version:{" "}
        {
          (
            JSON.parse(
              localStorage.getItem(params.cardset) ?? "{version:'no-storage'}",
            ) as Record<string, string>
          ).version
        }
      </div>
    </main>
  );
}
