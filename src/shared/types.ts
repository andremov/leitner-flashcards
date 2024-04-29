import type { Temporal } from "@js-temporal/polyfill";

export type QuestionOption = {
  id: string;
  name: string;
};

// Users

export type UserType = {
  id: string;
  name: string;
  color: string;
  currentStreak: number;
  longestStreak: number;
  lastPlayedAt: Temporal.PlainDate;
  createdAt: Temporal.PlainDate;
  updatedAt: Temporal.PlainDate;
};

export type UserQuestionHistoryType = {
  id: string;
  user: string;
  question: string;
  due: Temporal.PlainDate;
  leitnerBox: number;
  rightCount: number;
  wrongCount: number;
  createdAt: Temporal.PlainDate;
  updatedAt: Temporal.PlainDate;
};

// Questions

export type CategoryType = {
  id: string;
  name: string;
  color: string;
  createdAt: Temporal.PlainDate;
  updatedAt: Temporal.PlainDate;
};

export type ConceptType = {
  id: string;
  category: string;
  title: string;
  description: string;
  createdAt: Temporal.PlainDate;
  updatedAt: Temporal.PlainDate;
};

export type QuestionType = {
  id: string;
  concept: string;
  category: string;
  body: string;
  options: QuestionOption[];
  answer: string;
  createdAt: Temporal.PlainDate;
  updatedAt: Temporal.PlainDate;
};

export type QuestionTemplateType = {
  id: string;
  body: string;
  createdAt: Temporal.PlainDate;
  updatedAt: Temporal.PlainDate;
};

// QUESTION + HISTORY

export type UserQuestionType = QuestionType & {
  history?: UserQuestionHistoryType;
};
