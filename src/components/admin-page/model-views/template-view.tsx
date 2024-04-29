"use client";

import { InfoIcon, Loader2 } from "lucide-react";
import {
  NewQuestionTemplateCard,
  SkeletonQuestionTemplateCard,
  QuestionTemplateCard,
} from "../cards/template-card";
import { useDatedTemplates } from "~/hooks";

export function TemplateView() {
  const templates = useDatedTemplates();

  if (!templates) {
    return (
      <div className="flex flex-wrap gap-[1.155rem]">
        {Array.from({ length: 15 }).map((_, idx) => (
          <SkeletonQuestionTemplateCard key={idx} />
        ))}

        <div className="absolute left-0 top-1/2 flex w-full flex-col items-center gap-2">
          <Loader2
            className="animate-spin text-slate-400"
            width={50}
            height={50}
          />
          <h2 className="text-2xl font-bold text-slate-400">Loading...</h2>
        </div>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="flex flex-wrap gap-[1.155rem]">
        <NewQuestionTemplateCard />

        <div className="absolute left-0 top-1/2 flex w-full flex-col items-center gap-2">
          <InfoIcon className="text-slate-400" width={40} height={40} />
          <h2 className="text-lg font-bold text-slate-400">No users.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-[1.155rem]">
      <NewQuestionTemplateCard />

      {templates.map((t) => (
        <QuestionTemplateCard key={t.id} template={t} />
      ))}
    </div>
  );
}
