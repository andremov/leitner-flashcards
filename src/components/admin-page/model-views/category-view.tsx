"use client";

import { InfoIcon, Loader2 } from "lucide-react";
import {
  NewCategoryCard,
  SkeletonCategoryCard,
  CategoryCard,
} from "../cards/category-card";
import { useDatedCategories } from "~/hooks";

export function CategoryView() {
  const categories = useDatedCategories();

  if (categories === undefined) {
    return (
      <div className="flex flex-wrap gap-[2.14rem]">
        {Array.from({ length: 12 }).map((_, idx) => (
          <SkeletonCategoryCard key={idx} />
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

  if (categories.length === 0) {
    return (
      <div className="flex flex-wrap gap-[2.14rem]">
        <NewCategoryCard />

        <div className="absolute left-0 top-1/2 flex w-full flex-col items-center gap-2">
          <InfoIcon className="text-slate-400" width={40} height={40} />
          <h2 className="text-lg font-bold text-slate-400">No categories.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-[2.14rem]">
      <NewCategoryCard />

      {categories.map((c) => (
        <CategoryCard key={c.id} category={c} />
      ))}
    </div>
  );
}
