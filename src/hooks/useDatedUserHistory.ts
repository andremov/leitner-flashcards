import { Temporal } from "@js-temporal/polyfill";
import type { UserHistoryType, UserType } from "~/shared/types";
import { api } from "~/trpc/react";

export function useDatedUserHistory(
  userId?: UserType["id"],
): UserHistoryType[] | undefined {
  const today = Temporal.Now.plainDateISO();
  const pastDay1 = today.subtract({ days: 1 });
  const pastDay2 = pastDay1.subtract({ days: 1 });
  const pastDay3 = pastDay2.subtract({ days: 1 });
  const pastDay4 = pastDay3.subtract({ days: 1 });
  const tomorrow = today.add({ days: 1 });

  const { data: todayCount } = api.questionHistory.count.useQuery({
    user: userId ?? "",
    updatedAtRangeStart: new Date(today.toString()),
    updatedAtRangeEnd: new Date(tomorrow.toString()),
  });

  const { data: pastDay1Count } = api.questionHistory.count.useQuery({
    user: userId ?? "",
    updatedAtRangeStart: new Date(pastDay1.toString()),
    updatedAtRangeEnd: new Date(today.toString()),
  });

  const { data: pastDay2Count } = api.questionHistory.count.useQuery({
    user: userId ?? "",
    updatedAtRangeStart: new Date(pastDay2.toString()),
    updatedAtRangeEnd: new Date(pastDay1.toString()),
  });

  const { data: pastDay3Count } = api.questionHistory.count.useQuery({
    user: userId ?? "",
    updatedAtRangeStart: new Date(pastDay3.toString()),
    updatedAtRangeEnd: new Date(pastDay2.toString()),
  });

  const { data: pastDay4Count } = api.questionHistory.count.useQuery({
    user: userId ?? "",
    updatedAtRangeStart: new Date(pastDay4.toString()),
    updatedAtRangeEnd: new Date(pastDay3.toString()),
  });

  return [
    {
      count: pastDay4Count ?? 0,
      date: pastDay4,
    },
    {
      count: pastDay3Count ?? 100,
      date: pastDay3,
    },
    {
      count: pastDay2Count ?? 0,
      date: pastDay2,
    },
    {
      count: pastDay1Count ?? 0,
      date: pastDay1,
    },
    {
      count: todayCount ?? 0,
      date: today,
    },
  ];
}
