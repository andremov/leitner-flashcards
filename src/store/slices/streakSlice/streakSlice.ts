import type { StateCreator } from "zustand";
import { Temporal } from "@js-temporal/polyfill";
import type { LfStoreMiddlewares, StoreState } from "~/store/streakStore";
import type { StreakDataDayType, StreakSlice } from "./streakSlice.types";

function getBlankMonth(daysInMonth: number): StreakDataDayType[] {
  return Array.from({ length: daysInMonth }, () => ({
    pyd: false,
    rgt: 0,
    wrg: 0,
    rmn: 0,
  }));
}

function calcCurrentStreak(streak: number, days: StreakDataDayType[]) {
  const today = Temporal.Now.plainDateISO().day;

  if (today === 1) return streak;

  const daysCutOff = days
    .slice(0, today - 1)
    .map((item, index) => ({ ...item, index }))
    .filter((item) => !item.pyd);

  if (daysCutOff.length === 0) return streak + today - 1;

  return (
    today - 2 - daysCutOff[daysCutOff.length - 1]!.index + +days[today - 1]!.pyd
  );
}

export const createStreakSlice: StateCreator<
  StoreState,
  [...LfStoreMiddlewares],
  [],
  StreakSlice
> = (set, get) => ({
  month: Temporal.Now.plainDateISO().month,
  currentStreak: 0,
  longestStreak: 0,
  days: getBlankMonth(Temporal.Now.plainDateISO().daysInMonth),
  getTodayScore: (): StreakDataDayType => {
    const { days } = get();

    const today = Temporal.Now.plainDateISO().day - 1;

    return days[today]!;
  },
  updateTodayScore: (modification: Partial<StreakDataDayType>) => {
    const { days } = get();

    const today = Temporal.Now.plainDateISO().day - 1;

    set({
      days: days.map((item, index) => {
        if (today === index) {
          return {
            ...item,
            ...modification,
          };
        }
        return item;
      }),
    });
  },
  checkState: () => {
    const currentMonth = Temporal.Now.plainDateISO().month;

    const {
      month,
      currentStreak: currentStreakInState,
      days,
      longestStreak,
    } = get();

    if (currentMonth === month) return;

    const currentStreak = calcCurrentStreak(currentStreakInState, days);

    set({
      month: currentMonth,
      days: getBlankMonth(Temporal.Now.plainDateISO().daysInMonth),
      currentStreak: currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
    });
  },

  getCurrentStreak: () => {
    const { currentStreak, days } = get();

    return calcCurrentStreak(currentStreak, days);
  },
});
