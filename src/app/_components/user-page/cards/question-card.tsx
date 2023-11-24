"use client";

import { type Question } from "@prisma/client";
import { Check, Dot, X } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type DatedFlashcard } from "~/types/shared";
import { TallyCounters } from "../../tally-counters";

export default function QuestionCard(props: {
  flashcard: DatedFlashcard;
  updateDueDate: (id: string, diff: number) => void;
  refreshCards: () => void;
}) {
  const { flashcard, updateDueDate, refreshCards } = props;
  const [flipped, setFlipped] = useState(false);
  const [pickedAnswer, setPickedAnswer] = useState<number | undefined>(
    undefined,
  );
  const [pickedQuestion, pickQuestion] = useState<Question | undefined>(
    undefined,
  );

  const { data: questions } = api.question.getAll.useQuery({
    flashcard: flashcard.id,
  });

  const { data: category } = api.category.findOne.useQuery({
    id: flashcard.category,
  });

  useEffect(() => {
    if (!pickedQuestion && questions) {
      const index = Math.floor(Math.random() * questions.length);
      pickQuestion(questions[index]);
    }
  }, [questions, pickedQuestion]);

  function handlePickAnswer(e: MouseEvent, index: number) {
    e.stopPropagation();

    if (!pickedQuestion) return;

    setPickedAnswer(index);
    updateDueDate(flashcard.id, +(pickedQuestion.answer === index));
  }

  function handleClick() {
    if (!flipped) setFlipped(true);

    if (pickedAnswer !== undefined) {
      setFlipped(false);
      setTimeout(refreshCards, 600);
    }
  }

  if (!pickedQuestion)
    return (
      <div className="absolute m-4 h-72 w-96 cursor-pointer rounded-lg bg-white p-1 shadow-lg transition">
        <div className="flex h-full w-full flex-col items-center justify-around gap-2 rounded-md bg-violet-300 p-4 text-center text-slate-800">
          <h4 className="text-3xl font-semibold">Loading...</h4>
        </div>
      </div>
    );

  return (
    <div
      className="relative m-4 h-72 w-96"
      onClick={handleClick}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.5s",
        transform: `rotateY(${flipped ? "18" : ""}0deg)`,
      }}
    >
      <div
        className="absolute h-full w-full cursor-pointer rounded-lg bg-white p-1 shadow-lg transition"
        style={{
          transform: "translate3d(0, 0, 1)",
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-around gap-2 rounded-md bg-violet-300 p-4 text-center text-slate-800">
          <p>{flashcard.title}</p>
          <h4 className="text-3xl font-semibold">{pickedQuestion.title}</h4>
          {category && (
            <p
              className={`bg-${category.color} rounded-md px-2 py-1 text-white`}
            >
              {category.name}
            </p>
          )}

          <div className="flex w-8/12 items-center gap-1">
            <div className="flex flex-1 justify-between">
              <Check />
              <TallyCounters count={flashcard.right} />
            </div>
            <Dot className="h-10 w-10" />
            <div className="flex flex-1 justify-between">
              <TallyCounters count={flashcard.wrong} />
              <X />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute h-full w-full rounded-lg bg-white p-1 shadow-lg transition ${
          pickedAnswer !== undefined ? "cursor-pointer" : ""
        }`}
        style={{
          transform: "translate3d(0, 0, -1px) rotateY(180deg)",
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-around gap-2 rounded-md bg-orange-300 p-4 text-center text-slate-800">
          <p>
            {pickedQuestion.title}: {flashcard.title}
          </p>
          <h4 className="text-3xl font-semibold">{pickedQuestion.body}</h4>
          <div className="flex h-24 w-full flex-wrap items-center justify-center gap-2">
            {pickedQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={(e) => handlePickAnswer(e, index)}
                disabled={!!pickedAnswer}
                className={`h-10 w-5/12 rounded-md bg-black/30 text-white transition  ${
                  pickedAnswer === index
                    ? pickedQuestion.answer === index
                      ? "bg-lime-400"
                      : "bg-red-400"
                    : "hover:bg-black/50 disabled:bg-black/10"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
