"use client";

import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type DatedFlashcard } from "~/types/shared";

type ParsedStorage = Record<
  string,
  { due: string; box: number; right: number; wrong: number }
>;

function mapBox(newBox: number) {
const boxMapping = [1, 2, 4, 8, 16];

  if (newBox > boxMapping.length) {
    return boxMapping[boxMapping.length - 1];
  }

  return boxMapping[newBox];
}

function defaultHistoryRecord() {
  const { day, month, year } = Temporal.Now.plainDateISO();

  return {
    box: 0,
    due: `${year}-${month}-${day}`,
    right: 0,
    wrong: 0,
  };
}

function getPlainDateFromDue(dueDate: string): Temporal.PlainDate {
  const [year, month, day] = dueDate.split("-");

  return new Temporal.PlainDate(+year!, +month!, +day!);
}

function filterDueFlashcards(ffc: DatedFlashcard, today: Temporal.PlainDate) {
  const flashcardDate = getPlainDateFromDue(ffc.due);

  return flashcardDate.until(today).days >= 0;
}

export default function useLocalStorage(
  cardset: string,
): [DatedFlashcard[], (id: string, diff: number) => void, () => void] {
  const [, setFlashcards] = useState<DatedFlashcard[]>([]);
  const [dueFlashcards, setDueFlashcards] = useState<DatedFlashcard[]>([]);

  const { data: flashcards } = api.flashcard.getAll.useQuery({
    cardset: cardset,
  });

  useEffect(() => {
    refreshCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardset, flashcards]);

  function updateDueDate(id: string, diff: number) {
    const history = JSON.parse(
      localStorage.getItem(cardset) ?? "{}",
    ) as ParsedStorage;

    let historyElem = history[id] ?? defaultHistoryRecord();

    const { day, month, year } = getPlainDateFromDue(historyElem.due).add({
      days: mapBox(historyElem.box + diff),
    });

    historyElem = {
      box: historyElem.box + diff,
      due: `${year}-${month}-${day}`,
      right: historyElem.right + diff,
      wrong: historyElem.wrong + ((diff + 1) % 2),
    };

    localStorage.setItem(
      cardset,
      JSON.stringify({ ...history, [id]: historyElem }),
    );
  }

  function refreshCards() {
    if (flashcards) {
      const history = JSON.parse(
        localStorage.getItem(cardset) ?? "{}",
      ) as ParsedStorage;

      const fixedFlashcards = flashcards.map((flashcard) => {
        const historyElem = history[flashcard.id] ?? defaultHistoryRecord();

        return {
          ...flashcard,
          due: historyElem.due,
          box: historyElem.box,
          right: historyElem.right,
          wrong: historyElem.wrong,
        };
      });

      setFlashcards(fixedFlashcards);

      const today = Temporal.Now.plainDateISO();
      setDueFlashcards(
        fixedFlashcards.filter((ffc) => filterDueFlashcards(ffc, today)),
      );
    }
  }

  return [dueFlashcards, updateDueDate, refreshCards];
}
