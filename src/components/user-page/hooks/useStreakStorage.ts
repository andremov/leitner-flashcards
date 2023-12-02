"use client";

import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useState } from "react";
import { type StreakDataDayType, type StreakDataType } from "~/shared/types";

function getBlankMonth(daysInMonth: number) {
  return Array.from({ length: daysInMonth }, () => ({
    played: false,
    right: 0,
    wrong: 0,
    remain: 0,
  }));
}

export default function useStreakStorage(): [
  StreakDataType | undefined,
  (right: number, wrong: number, remain: number) => void,
  () => void,
  StreakDataDayType | undefined,
  boolean,
] {
  const [loaded, setLoaded] = useState(false);
  const [streakData, setStreakData] = useState<StreakDataType | undefined>(
    undefined,
  );
  const [todayData, setTodayData] = useState<StreakDataDayType | undefined>(
    undefined,
  );

  useEffect(() => {
    refreshCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateToday(right: number, wrong: number, remain: number) {
    let storagedStreakData = JSON.parse(
      localStorage.getItem("streak-data") ?? "{}",
    ) as StreakDataType;

    const today = Temporal.Now.plainDateISO();

    const yesterday = today.subtract({ days: 1 });
    let currentStreak = 1;

    if (Object.keys(storagedStreakData).length === 0) {
      storagedStreakData = {
        currentStreak: 0,
        longestStreak: 0,
        month: today.month,
        days: getBlankMonth(today.daysInMonth),
      };
    }

    if (storagedStreakData.days[yesterday.day - 1]?.played) {
      currentStreak = storagedStreakData.currentStreak + 1;
    }

    if (today.month !== storagedStreakData.month) {
      storagedStreakData = {
        ...storagedStreakData,
        month: today.month,
        days: getBlankMonth(today.daysInMonth),
      };
    }

    storagedStreakData.currentStreak = currentStreak;
    if (storagedStreakData.currentStreak > storagedStreakData.longestStreak) {
      storagedStreakData.longestStreak = storagedStreakData.currentStreak;
    }

    storagedStreakData.days[today.day - 1] = {
      played: true,
      right,
      wrong,
      remain,
    };

    localStorage.setItem("streak-data", JSON.stringify(storagedStreakData));
  }

  function refreshCalendar() {
    setLoaded(false);
    let storagedStreakData = JSON.parse(
      localStorage.getItem("streak-data") ?? "{}",
    ) as StreakDataType;

    const today = Temporal.Now.plainDateISO();

    if (Object.keys(storagedStreakData).length === 0) {
      storagedStreakData = {
        currentStreak: 0,
        longestStreak: 0,
        month: today.month,
        days: getBlankMonth(today.daysInMonth),
      };
    }

    if (today.month !== storagedStreakData.month) {
      storagedStreakData = {
        ...storagedStreakData,
        month: today.month,
        days: getBlankMonth(today.daysInMonth),
      };
    }

    setTodayData(storagedStreakData.days[today.day - 1]);
    setStreakData(storagedStreakData);
    setLoaded(true);
  }

  return [streakData, updateToday, refreshCalendar, todayData, loaded];
}
