"use client";

import clsx from "clsx";
import { AlertTriangleIcon, Dot, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import type { UserQuestionType } from "~/shared/types";
import { api } from "~/trpc/react";
import { QuestionHistory } from "./question-history";
import { successDing, failureDrum } from "~/shared/assets";

export function QuestionView({
  question,
  handleQuestionAnswered,
}: {
  question: UserQuestionType;
  handleQuestionAnswered: (rightAnswer: boolean) => void;
}) {
  const { data: concept } = api.concept.findOne.useQuery({
    id: question.concept,
  });

  const { data: category } = api.category.findOne.useQuery({
    id: question.category,
  });

  const [pickedAnswer, pickAnswer] = useState<string | undefined>(undefined);

  function handlePickAnswer(newPickedAnswer: string) {
    if (pickedAnswer === undefined) {
      pickAnswer(newPickedAnswer);
      handleQuestionAnswered(newPickedAnswer === question.answer);

      if (newPickedAnswer === question.answer) {
        successDing.play();
      } else {
        failureDrum.play();
      }
    }
  }

  useEffect(() => {
    pickAnswer(undefined);
  }, [question.id]);

  if (concept === undefined || category === undefined) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-200 text-black/60">
        <Loader2Icon className="animate-spin" width={40} height={40} />
        <span className="text-xl font-bold">Loading...</span>
      </main>
    );
  }

  if (concept === null || category === null) {
    return (
      <main className="flex min-h-screen max-w-[10rem] flex-col items-center justify-center gap-2 bg-slate-200 text-black/60">
        <AlertTriangleIcon width={40} height={40} />
        <span className="text-xl font-bold">Error.</span>
        <span>{JSON.stringify(question)}</span>
      </main>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-fit items-center rounded-md bg-black/50 px-2 py-1 text-sm text-white">
        <span>{category.name}</span>
        <Dot width={20} height={20} />
        <span>{concept.title}</span>
      </div>

      <QuestionHistory questionHistory={question.history} />

      <div
        className={`min-w-[18rem] items-center rounded-lg px-8 py-4 text-center text-white md:min-w-[33rem] bg-${category.color}-500 shadow-lg`}
      >
        <span className="text-lg font-bold">{question.body}</span>
      </div>

      <div className="mt-12 flex max-w-[33rem] flex-col items-center gap-4 md:flex-row md:flex-wrap">
        {question.options.map((o) => (
          <button
            className={clsx([
              "w-64 rounded-md border-4 py-2 text-lg text-white transition",
              {
                "border-transparent bg-black/30 hover:scale-110 active:scale-95":
                  pickedAnswer === undefined,
                "disabled:bg-red-400": question.answer !== o.id,
                "disabled:bg-green-400": question.answer === o.id,
                "border-white": pickedAnswer === o.id,
                "disabled:border-red-400":
                  pickedAnswer !== o.id && question.answer !== o.id,
                "disabled:border-green-400":
                  pickedAnswer !== o.id && question.answer === o.id,
              },
            ])}
            key={o.id}
            disabled={pickedAnswer !== undefined}
            onClick={() => handlePickAnswer(o.id)}
          >
            {o.name}
          </button>
        ))}

        {question.history === undefined ? (
          <div className="mt-4 w-full text-center text-slate-500">
            Nunca respondido.
          </div>
        ) : (
          <div className="mt-4 w-full text-center text-slate-500">
            Respondido por última vez: {question.history.updatedAt.toString()}
          </div>
        )}
      </div>
    </div>
  );
}
