"use client";

import { InfoIcon, Loader2 } from "lucide-react";
import { api } from "~/trpc/react";
import {
  NewConceptCard,
  SkeletonConceptCard,
  ConceptCard,
} from "../cards/concept-card";
import { useState } from "react";
import clsx from "clsx";
import type { CategoryType } from "~/shared/types";
import { useDatedCategories, useDatedConcepts } from "~/hooks";

export function ConceptView() {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState<"" | "category" | "title" | "createdAt">(
    "",
  );
  const categories = useDatedCategories();
  const concepts = useDatedConcepts();

  if (!concepts || !categories) {
    return (
      <div className="flex flex-wrap gap-[1.975rem]">
        {Array.from({ length: 15 }).map((_, idx) => (
          <SkeletonConceptCard key={idx} />
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

  console.log(concepts[0]);

  if (concepts.length === 0) {
    return (
      <div className="flex flex-wrap gap-[1.975rem]">
        <NewConceptCard />

        <div className="absolute left-0 top-1/2 flex w-full flex-col items-center gap-2">
          <InfoIcon className="text-slate-400" width={40} height={40} />
          <h2 className="text-lg font-bold text-slate-400">No concepts.</h2>
        </div>
      </div>
    );
  }

  const categoryLookup: Record<string, CategoryType> = categories.reduce(
    (lookup, cat) => ({ ...lookup, [cat.id]: cat }),
    {},
  );

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <input
          type="search"
          className="w-64 rounded-md border border-black/20 px-2 py-1"
          placeholder="Search..."
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
          <option className="text-black" value={"title"}>
            Name
          </option>
          <option className="text-black" value={"category"}>
            Category
          </option>
        </select>
      </div>
      <div className="flex flex-wrap gap-[1.975rem]">
        {concepts
          .filter((c) => {
            if (searchText !== "" && !c.title.includes(searchText)) {
              return false;
            }
            if (filterCategory !== "" && c.category !== filterCategory) {
              return false;
            }
            return true;
          })
          .sort((c1, c2) => {
            switch (sortBy) {
              case "category":
              case "title":
                return c1[sortBy].localeCompare(c2[sortBy]);
              case "createdAt":
                console.log({
                  createdAt: c1.createdAt,
                  tp: typeof c1.createdAt,
                });

                return c1.createdAt.since(c2.createdAt).sign;
              default:
                return 0;
            }
          })
          .map((c) => (
            <ConceptCard
              key={c.id}
              concept={c}
              category={categoryLookup[c.category]}
            />
          ))}

        <NewConceptCard />
      </div>
    </div>
  );
}
