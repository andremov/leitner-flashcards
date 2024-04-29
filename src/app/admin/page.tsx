"use client";

import { InfoIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HeaderItem } from "~/components/admin-page/header-item";
import { AdminModalHandler } from "~/components/admin-page/modals/modal-handler";
import {
  UserView,
  ConceptView,
  QuestionView,
  CategoryView,
  TemplateView,
} from "~/components/admin-page/model-views";

type AdminViewType = {
  internalName: string;
  displayName: string;
};

const adminViews: AdminViewType[] = [
  { internalName: "users", displayName: "Users" },
  { internalName: "categories", displayName: "Categories" },
  { internalName: "concepts", displayName: "Concepts" },
  { internalName: "questions", displayName: "Questions" },
  { internalName: "templates", displayName: "Question Templates" },
];

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeAdminView = searchParams.get("adminView");

  function setView(viewIndex: AdminViewType["internalName"]) {
    const params = new URLSearchParams(searchParams);

    params.set("adminView", viewIndex);

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <main className="flex h-screen flex-col gap-2 p-2">
      <AdminModalHandler />

      <header className="flex gap-2">
        {adminViews.map((av) => (
          <HeaderItem
            key={av.internalName}
            onClick={() => setView(av.internalName)}
            isActive={activeAdminView === av.internalName}
          >
            {av.displayName}
          </HeaderItem>
        ))}
      </header>

      <ParseView
        adminView={adminViews.find((av) => av.internalName === activeAdminView)}
      />
    </main>
  );
}

function NoViewSelected() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <InfoIcon width={50} height={50} className="text-slate-500" />
      <h2 className="text-lg font-bold text-slate-500">No view selected.</h2>
    </div>
  );
}

function ParseView({ adminView }: { adminView?: AdminViewType }) {
  if (adminView === undefined) {
    return <NoViewSelected />;
  }

  return (
    <div className="flex flex-1 flex-col gap-2 rounded-lg border-t-2 border-slate-400 pb-4">
      <h2 className="my-2 text-center text-2xl font-bold">
        {adminView.displayName}
      </h2>

      {adminView.internalName === "users" && <UserView />}
      {adminView.internalName === "categories" && <CategoryView />}
      {adminView.internalName === "concepts" && <ConceptView />}
      {adminView.internalName === "questions" && <QuestionView />}
      {adminView.internalName === "templates" && <TemplateView />}
    </div>
  );
}
