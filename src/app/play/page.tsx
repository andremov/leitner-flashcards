"use client";

import { Loader2Icon } from "lucide-react";
import { useUserStore } from "~/store/userStore";
import { UserCard } from "~/components/user-page/cards/user-card";
import { redirect } from "next/navigation";
import { useDatedUserQuestions } from "~/hooks/useDatedUserQuestions";
import { useState } from "react";
import { QuestionView } from "~/components/user-page/question-view";
import { api } from "~/trpc/react";
import { mapBox } from "~/shared/functions";
import { Temporal } from "@js-temporal/polyfill";
import { openCard } from "~/shared/assets";

export default function UserHome() {
  const { user, setUser } = useUserStore();
  const pendingQuestions = useDatedUserQuestions(user?.id);
  const [curQuestion, setCurQuestion] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const createQuestionHistory = api.questionHistory.create.useMutation({});
  const updateQuestionHistory = api.questionHistory.update.useMutation({});
  const updateUser = api.user.update.useMutation({});

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

      <button
        disabled={!questionAnswered}
        className={`m-4 h-16 w-72 rounded-md border-4 border-white bg-${user.color}-500 text-lg font-bold text-white shadow-lg transition enabled:hover:scale-110 enabled:active:scale-95 disabled:border-slate-300 disabled:bg-slate-300 disabled:text-slate-400 disabled:shadow-none`}
        onClick={handleNextQuestion}
      >
        Siguiente
      </button>
    </main>
  );
}
