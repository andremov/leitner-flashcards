import clsx from "clsx";
import { CrownIcon, Loader2Icon } from "lucide-react";
import { useDatedUserHistory } from "~/hooks/useDatedUserHistory";
import { useUserStore } from "~/store/userStore";

export function StreakDetails() {
  const { user } = useUserStore();
  const userHistory = useDatedUserHistory(user?.id);

  if (!user) {
    return (
      <div className="m-4 flex w-72 flex-col items-center gap-4 rounded-md border-4 border-white bg-slate-500  p-4 text-white shadow-2xl">
        <Loader2Icon className="animate-spin" width={35} height={35} />
      </div>
    );
  }

  return (
    <div
      className={`m-4 flex w-72 flex-col gap-4 rounded-md border-4 border-white bg-${user.color}-500 p-4  text-white shadow-2xl`}
    >
      <div className="flex items-center justify-around font-bold">
        <CrownIcon className="fill-white" />
        <span className="text-xl">{user.longestStreak}</span>
      </div>

      {userHistory !== undefined && (
        <div className="flex justify-between">
          {userHistory.map((uh, idx) => (
            <div
              className={clsx([
                "flex h-12 w-12 flex-col items-center justify-center rounded-md bg-black/30",
                {
                  "bg-green-500":
                    user.currentStreak - (userHistory.length - idx) >= 0,
                },
              ])}
              key={idx}
            >
              <span className="text-xs">
                {uh.date.month}-{uh.date.day}
              </span>
              <span className="font-bold">{uh.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
