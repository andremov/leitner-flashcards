"use client";

import { type Question } from "@prisma/client";
import { Check, Dot, X } from "lucide-react";
import { type MouseEvent, useEffect, useState, CSSProperties } from "react";
import { api } from "~/trpc/react";
import { type DatedFlashcard } from "~/shared/types";
import { TallyCounters } from "../tally-counters";
import { successDing, failureDrum } from "~/shared/assets";

export default function QuestionCard(props: {
  flashcard: DatedFlashcard;
  updateDueDate: (id: string, diff: number) => void;
  refreshCards: () => void;
  handleModifyScore: (right: boolean) => void;
}) {
  const { handleModifyScore, flashcard, updateDueDate, refreshCards } = props;
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
    handleModifyScore(pickedQuestion.answer === index);

    if (pickedQuestion.answer === index) {
      successDing.play();
    } else {
      failureDrum.play();
    }
  }

  function handleClick() {
    if (!flipped) setFlipped(true);

    if (pickedAnswer !== undefined) {
      setFlipped(false);
      setTimeout(refreshCards, 600);
    }
  }

  if (!pickedQuestion) {
    return (
      <div className="absolute m-4 h-72 cursor-pointer rounded-lg bg-white p-1 shadow-lg transition sm:w-96">
        <div className="flex h-full w-full flex-col items-center justify-around gap-2 rounded-md bg-slate-300 p-4 text-center text-slate-800">
          <h4 className="text-3xl font-semibold">Loading...</h4>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative m-4 h-96 w-72 sm:h-72 sm:w-96"
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
        <div
          className={`flex h-full w-full flex-col items-center justify-around gap-2 rounded-md  p-4 text-center text-slate-800 bg-${
            category ? category.color : "slate"
          }-300`}
        >
          <p>{pickedQuestion.title}</p>
          <h4 className="text-3xl font-semibold">{flashcard.title}</h4>
          {category && (
            <p
              className={`bg-${category.color}-500 rounded-md px-2 py-1 text-white`}
            >
              {category.name}
            </p>
          )}

          <div
            className="flex w-10/12 items-center gap-1 rounded-3xl bg-white px-3"
            style={{
              boxShadow: "inset 0 2px 2px 0 rgb(0 0 0 / 0.3)",
            }}
          >
            <div className="flex flex-1 justify-between text-emerald-400">
              <Check />
              <TallyCounters size={25} count={flashcard.right} />
            </div>
            <Dot className="h-10 w-10" />
            <div className="flex flex-1 justify-between text-red-400">
              <TallyCounters size={25} count={flashcard.wrong} />
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
        <div
          className={`flex h-full w-full flex-col items-center justify-around gap-2 rounded-md p-4 text-center text-slate-800 bg-${
            category ? category.color : "slate"
          }-300`}
        >
          <p>
            {pickedQuestion.title}: {flashcard.title}
          </p>
          <h4 className="text-2xl font-semibold">{pickedQuestion.body}</h4>
          <div className="flex h-48 w-full flex-wrap items-center justify-center gap-2 sm:h-24">
            {pickedQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={(e) => handlePickAnswer(e, index)}
                disabled={pickedAnswer !== undefined}
                className={`h-10 w-56 rounded-md px-1 leading-4 text-slate-800 transition sm:w-36 ${
                  pickedAnswer === index
                    ? pickedQuestion.answer === index
                      ? "border-2 border-white bg-lime-500"
                      : "border-2 border-white bg-red-500"
                    : pickedQuestion.answer === index && !!pickedAnswer
                      ? "bg-lime-500"
                      : "bg-white/50 hover:bg-white/70 disabled:bg-black/30"
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
