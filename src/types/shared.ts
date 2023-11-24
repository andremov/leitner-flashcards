import { type Flashcard } from "@prisma/client";

export type DatedFlashcard = Flashcard & {
  due: string;
  box: number;
  right: number;
  wrong: number;
};
