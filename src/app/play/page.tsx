"use client";

import { ArrowRightIcon, Loader2Icon, XIcon } from "lucide-react";
import { useUserStore } from "~/store/userStore";
import { UserCard } from "~/components/user-page/cards/user-card";
import { redirect } from "next/navigation";
import { useDatedUserQuestions } from "~/hooks/useDatedUserQuestions";
import { useEffect, useState } from "react";
import { QuestionView } from "~/components/user-page/question-view";
import { api } from "~/trpc/react";
import { mapBox } from "~/shared/functions";
import { Temporal } from "@js-temporal/polyfill";
import { openCard } from "~/shared/assets";
import Link from "next/link";
import clsx from "clsx";

export default function UserHome() {
  const { user, setUser } = useUserStore();
  const pendingQuestions = useDatedUserQuestions(user?.id);
  const [curQuestion, setCurQuestion] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const createQuestionHistory = api.questionHistory.create.useMutation({});
  const updateQuestionHistory = api.questionHistory.update.useMutation({});
  const updateUser = api.user.update.useMutation({});

  useEffect(() => {
    if (pendingQuestions !== undefined && user !== undefined) {
      if (pendingQuestions.length === 0) {
        updateUser.mutate({
          id: user.id,
          lastPlayedAt: new Date(),
          currentStreak: user.currentStreak + 1,
          longestStreak:
            user.currentStreak + 1 > user.longestStreak
              ? user.currentStreak + 1
              : user.longestStreak,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingQuestions, user]);

  useEffect(() => {
    setQuestionAnswered(false);
    setCurQuestion(0);
  }, [pendingQuestions?.length]);

  if (!user) {
    redirect("/");
  }

  function handleNextQuestion() {
    setQuestionAnswered(false);
    setCurQuestion(curQuestion + 1);

    openCard.play();
  }

  function handleQuestionAnswered(rightAnswer: boolean) {
    setQuestionAnswered(true);

    if (user === undefined) return;
    if (pendingQuestions === undefined) return;

    const thisQuestion = pendingQuestions[curQuestion];

    if (thisQuestion === undefined) return;

    if (thisQuestion.history === undefined) {
      const dayDiff = mapBox(1);

      createQuestionHistory.mutate({
        rightCount: +rightAnswer,
        wrongCount: +!rightAnswer,
        user: user.id,
        question: thisQuestion.id,
        due: new Date(
          Temporal.Now.instant()
            .add({ hours: dayDiff * 24 })
            .toString(),
        ),
        leitnerBox: 1,
      });
    } else {
      const newBox = rightAnswer ? thisQuestion.history.leitnerBox + 1 : 0;
      const dayDiff = mapBox(newBox);

      updateQuestionHistory.mutate({
        id: thisQuestion.history.id,
        rightCount: thisQuestion.history.rightCount + +rightAnswer,
        wrongCount: thisQuestion.history.wrongCount + +!rightAnswer,
        due: new Date(
          Temporal.Now.instant()
            .add({ hours: dayDiff * 24 })
            .toString(),
        ),
        leitnerBox: newBox,
      });
    }

    const today = Temporal.Now.plainDateISO().toString();
    const lastPlayedAt = user.lastPlayedAt.toString();
    const nextStreakDay = user.lastPlayedAt.add({ days: 1 }).toString();

    if (lastPlayedAt === today) {
      // already up to date
    } else if (nextStreakDay === today) {
      // last played was yesterday, update streaks
      updateUser.mutate({
        id: user.id,
        lastPlayedAt: new Date(),
        currentStreak: user.currentStreak + 1,
        longestStreak:
          user.currentStreak + 1 > user.longestStreak
            ? user.currentStreak + 1
            : user.longestStreak,
      });
      setUser({
        ...user,
        lastPlayedAt: Temporal.Now.plainDateISO(),
        currentStreak: user.currentStreak + 1,
        longestStreak:
          user.currentStreak + 1 > user.longestStreak
            ? user.currentStreak + 1
            : user.longestStreak,
      });
    } else {
      // has never played, or hasnt played in awhile, reset streaks
      updateUser.mutate({
        id: user.id,
        lastPlayedAt: new Date(),
        currentStreak: 1,
        longestStreak: 1,
      });
      setUser({
        ...user,
        lastPlayedAt: Temporal.Now.plainDateISO(),
        currentStreak: 1,
        longestStreak: 1,
      });
    }
  }

  if (pendingQuestions == undefined) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-200 text-black/60">
        <Loader2Icon className="animate-spin" width={40} height={40} />
        <span className="text-xl font-bold">Loading...</span>
      </main>
    );
  }

  if (curQuestion >= pendingQuestions.length) {
    redirect("/menu");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-200 text-slate-950">
      <UserCard user={user} />

      <QuestionView
        handleQuestionAnswered={handleQuestionAnswered}
        question={pendingQuestions[curQuestion]!}
      />

      <div className="m-4 flex gap-4">
        <Link href={"/menu"}>
          <div
            className={clsx([
              "flex h-16 w-16 items-center justify-center rounded-md text-lg font-bold transition",
              {
                "bg-slate-300 text-slate-400 shadow-none": !questionAnswered,
                "bg-red-500 text-white shadow-lg hover:scale-110 active:scale-95":
                  questionAnswered,
              },
            ])}
          >
            <XIcon />
          </div>
        </Link>
        <button
          disabled={!questionAnswered}
          className={`flex h-16 w-72 items-center justify-center gap-2 rounded-md bg-${user.color}-500 text-lg font-bold text-white shadow-lg transition enabled:hover:scale-110 enabled:active:scale-95 disabled:bg-slate-300 disabled:text-slate-400 disabled:shadow-none`}
          onClick={handleNextQuestion}
        >
          <span>Siguiente</span>
          <ArrowRightIcon />
        </button>
      </div>
    </main>
  );
}
