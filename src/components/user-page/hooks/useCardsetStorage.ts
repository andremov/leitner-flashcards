"use client";

import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  type DatedQuestionCard,
  type CardsetStorageType,
} from "~/shared/types";

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

function filterDueQuestions(ffc: DatedQuestionCard, today: Temporal.PlainDate) {
  const flashcardDate = getPlainDateFromDue(ffc.due);

  return flashcardDate.until(today).days >= 0;
}

export default function useCardsetStorage(
  cardset: string,
): [
  DatedQuestionCard[],
  (id: string, diff: number) => void,
  () => void,
  boolean,
] {
  const [loaded, setLoaded] = useState(false);
  const [dueFlashcards, setDueFlashcards] = useState<DatedQuestionCard[]>([]);

  const { data: questions } = api.question.getAll.useQuery({
    cardset: cardset,
  });

  useEffect(() => {
    refreshCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardset, questions]);

  function updateDueDate(id: string, diff: number) {
    let history = JSON.parse(
      localStorage.getItem(cardset) ?? "{}",
    ) as CardsetStorageType;

    if (!history.version) {
      history = {
        version: "1.1",
        questionData: {},
      };
    }

    let historyElem = history.questionData[id] ?? defaultHistoryRecord();

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
      JSON.stringify({
        ...history,
        questionData: { ...history.questionData, [id]: historyElem },
      }),
    );
  }

  function refreshCards() {
    if (questions) {
      setLoaded(false);
      let history = JSON.parse(
        localStorage.getItem(cardset) ?? "{}",
      ) as CardsetStorageType;

      if (!history.version) {
        history = {
          version: "1.1",
          questionData: {},
        };
      }

      const fixedQuestions = questions.map((flashcard) => {
        const historyElem =
          history.questionData[flashcard.id] ?? defaultHistoryRecord();

        return {
          ...flashcard,
          due: historyElem.due,
          box: historyElem.box,
          right: historyElem.right,
          wrong: historyElem.wrong,
        };
      });

      const today = Temporal.Now.plainDateISO();
      setDueFlashcards(
        fixedQuestions.filter((ffc) => filterDueQuestions(ffc, today)),
      );
      setLoaded(true);
    }
  }

  return [dueFlashcards, updateDueDate, refreshCards, loaded];
}
