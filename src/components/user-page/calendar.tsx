"use client";

import { Temporal } from "@js-temporal/polyfill";
import { Crown, Star, StarIcon, StarOff, Stars } from "lucide-react";
import { type StreakDataType } from "~/shared/types";

export default function Calendar(props: {
  streakData: StreakDataType | undefined;
}) {
  const { streakData } = props;
  const today = Temporal.Now.plainDateISO();
  const firstDay = today.subtract({ days: today.daysInMonth - 1 });

  if (!streakData) return <></>;

  return (
    <div className="m-4 cursor-pointer rounded-lg bg-white p-1 shadow-lg transition hover:scale-110">
      <div className="flex h-96 w-64 flex-col items-center justify-center gap-2 rounded-md bg-black/10 text-center text-slate-800">
        <h3 className="text-2xl font-bold">
          {today.toLocaleString(undefined, { month: "long" })}
        </h3>

        <div className="h-50 my-7 box-border flex w-56 flex-wrap items-center gap-1">
          {Array.from({ length: firstDay.dayOfWeek + 2 }).map((_, index) => (
            <div key={index} className="h-7 w-7"></div>
          ))}
          {streakData.days.map((day, index) => (
            <div
              key={index}
              className={`relative flex h-7 w-7  items-center justify-center rounded-lg p-0.5 ${
                today.day - 1 === index ? "border border-black/50" : ""
              } ${
                day.played
                  ? day.wrong === 0 && day.remain === 0
                    ? "bg-amber-400"
                    : "bg-emerald-300"
                  : "bg-black/10"
              }`}
            >
              {day.played && day.wrong === 0 && day.remain === 0 && (
                <Star className="absolute text-white/70" />
              )}
              <span
                className={`absolute font-bold ${
                  day.played ? "text-black/30" : ""
                }`}
              >
                {index + 1}
              </span>
            </div>
          ))}
        </div>

        <div className="flex w-full gap-3 px-5">
          <Crown />
          <span>Longest Streak: {streakData.longestStreak}</span>
        </div>

        <div className="flex w-full gap-3 px-5">
          <Stars />
          <span>Current Streak: {streakData.currentStreak}</span>
        </div>
      </div>
    </div>
  );
}
