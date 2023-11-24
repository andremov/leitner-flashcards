"use client";

import useLocalStorage from "../_components/user-page/hooks/useLocalStorage";
import QuestionCard from "../_components/user-page/cards/question-card";
import { RefreshCw } from "lucide-react";

export default function Page({ params }: { params: { cardset: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datedFlashcards, dueFlashcards, updateDueDate, refreshCards] =
    useLocalStorage(params.cardset);

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-200 text-slate-950">
      <div className="m-4 rounded-lg bg-sky-400 px-8 py-4 text-white">
        <h2>Today&apos;s flashcards: {dueFlashcards.length}</h2>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        {dueFlashcards.length > 0 ? (
          <>
            <QuestionCard
              key={dueFlashcards[0]!.id}
              flashcard={dueFlashcards[0]!}
              updateDueDate={updateDueDate}
              refreshCards={refreshCards}
            />
            <button
              className="rounded-md border-2 border-black bg-white px-4 py-2"
              onClick={() => refreshCards()}
            >
              <RefreshCw />
            </button>
          </>
        ) : (
          <p>We&apos;re done!</p>
        )}
      </div>
    </main>
  );
}
