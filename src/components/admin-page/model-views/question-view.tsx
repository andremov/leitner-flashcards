"use client";

import { InfoIcon, Loader2 } from "lucide-react";
import {
  NewQuestionCard,
  QuestionCard,
  SkeletonQuestionCard,
} from "../cards/question-card";
import {
  useDatedCategories,
  useDatedConcepts,
  useDatedQuestions,
} from "~/hooks";
import type { CategoryType, ConceptType } from "~/shared/types";
import { useState } from "react";
import clsx from "clsx";

export function QuestionView() {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState<
    "" | "category" | "concept" | "title" | "createdAt"
  >("");

  const questions = useDatedQuestions();
  const categories = useDatedCategories();
  const concepts = useDatedConcepts();

  if (
    questions === undefined ||
    categories === undefined ||
    concepts === undefined
  ) {
    return (
      <div className="flex flex-wrap gap-[1.985rem]">
        {Array.from({ length: 15 }).map((_, idx) => (
          <SkeletonQuestionCard key={idx} />
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

  if (questions.length === 0) {
    return (
      <div className="flex flex-wrap gap-[1.985rem]">
        <NewQuestionCard />

        <div className="absolute left-0 top-1/2 flex w-full flex-col items-center gap-2">
          <InfoIcon className="text-slate-400" width={40} height={40} />
          <h2 className="text-lg font-bold text-slate-400">No questions.</h2>
        </div>
      </div>
    );
  }

  const categoryLookup: Record<string, CategoryType> = categories.reduce(
    (lookup, cat) => ({ ...lookup, [cat.id]: cat }),
    {},
  );

  const conceptLookup: Record<string, ConceptType> = concepts.reduce(
    (lookup, con) => ({ ...lookup, [con.id]: con }),
    {},
  );

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <input
          type="search"
          className="w-64 rounded-md border border-black/20 px-2 py-1"
          placeholder="Search by concept name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
          className={clsx([
            "w-64 rounded-md border border-black/20 px-2 py-1",
            { "text-black/50": filterCategory === "" },
          ])}
        >
          <option className="text-black/50" value={""}>
            Select a category
          </option>
          {categories.map((c, idx) => (
            <option className="text-black" value={c.id} key={idx}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          value={sortBy}
          className={clsx([
            "w-64 rounded-md border border-black/20 px-2 py-1",
            { "text-black/50": sortBy === "" },
          ])}
        >
          <option className="text-black/50" value={""}>
            Sort by...
          </option>
          <option className="text-black" value={"createdAt"}>
            Created Date
          </option>
          <option className="text-black" value={"concept"}>
            Concept
          </option>
          <option className="text-black" value={"category"}>
            Category
          </option>
        </select>
      </div>

      <div className="flex flex-wrap gap-[1.985rem]">
        <NewQuestionCard />

        {questions
          .filter((q) => {
            // const category = categoryLookup[q.category]!;
            const concept = conceptLookup[q.concept];

            if (
              searchText !== "" &&
              concept !== undefined &&
              !concept.title.includes(searchText)
            ) {
              return false;
            }
            if (filterCategory !== "" && q.category !== filterCategory) {
              return false;
            }
            return true;
          })
          .sort((q1, q2) => {
            switch (sortBy) {
              case "category":
              case "concept":
                return q1[sortBy].localeCompare(q2[sortBy]);
              case "createdAt":
                return q1.createdAt.since(q2.createdAt).sign;
              default:
                return 0;
            }
          })
          .map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              category={categoryLookup[q.category]}
              concept={conceptLookup[q.concept]}
            />
          ))}
      </div>
    </div>
  );
}
