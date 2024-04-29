import { CheckIcon, Dot, XIcon } from "lucide-react";
import { TallyCounters } from "./tally-counters";
import type { UserQuestionHistoryType } from "~/shared/types";

export function QuestionHistory({
  questionHistory,
}: {
  questionHistory?: UserQuestionHistoryType;
}) {
  if (questionHistory === undefined) {
    return (
      <div
        className="flex items-center rounded-md bg-white px-2 py-1 text-sm font-bold text-black"
        style={{
          boxShadow: "inset 0 0px 3px 2px rgb(0 0 0 / 0.3)",
        }}
      >
        <div className="flex w-24 items-center justify-between">
          <CheckIcon width={20} height={20} className="text-green-400" />
          <TallyCounters count={0} size={20} />
        </div>
        <Dot />
        <div className="flex w-24 items-center justify-between">
          <TallyCounters count={0} size={20} />
          <XIcon width={20} height={20} className="text-red-400" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center rounded-md bg-white px-2 py-1 text-sm font-bold text-black"
      style={{
        boxShadow: "inset 0 2px 2px 0 rgb(0 0 0 / 0.3)",
      }}
    >
      <div className="flex w-24 items-center justify-between">
        <CheckIcon width={20} height={20} className="text-green-400" />
        <TallyCounters count={questionHistory.rightCount} size={20} />
      </div>
      <Dot />
      <div className="flex w-24 items-center justify-between">
        <TallyCounters count={questionHistory.wrongCount} size={20} />
        <XIcon width={20} height={20} className="text-red-400" />
      </div>
    </div>
  );
}
