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
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
};

export type UserQuestionHistoryType = {
  id: string;
  user: string;
  question: string;
  due: Temporal.Instant;
  leitnerBox: number;
  rightCount: number;
  wrongCount: number;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
};

// Questions

export type CategoryType = {
  id: string;
  name: string;
  color: string;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
};

export type ConceptType = {
  id: string;
  category: string;
  title: string;
  description: string;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
};

export type QuestionType = {
  id: string;
  concept: string;
  category: string;
  body: string;
  options: QuestionOption[];
  answer: string;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
};

export type QuestionTemplateType = {
  id: string;
  body: string;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
};
