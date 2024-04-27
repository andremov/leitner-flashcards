"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function EditQuestionTemplate(props: {
  templateId: string | undefined;
  stopEditing: () => void;
}) {
  const { templateId, stopEditing } = props;
  const router = useRouter();
  const utils = api.useUtils();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const updateQuestionTemplate = api.questionTemplate.update.useMutation({
    onSuccess: () => {
      void utils.questionTemplate.getAll.invalidate();
      setTimeout(() => router.refresh(), 600);
    },
  });

  const { data: editingTemplate } = api.questionTemplate.findOne.useQuery({
    id: templateId!,
  });

  useEffect(() => {
    if (editingTemplate) {
      setBody(editingTemplate.body);
      setTitle(editingTemplate.title);
    }
  }, [editingTemplate]);

  if (!editingTemplate) return <></>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateQuestionTemplate.mutate({
          id: editingTemplate.id,
          title: title,
          body: body,
        });
        stopEditing();
      }}
      className={`relative flex h-fit w-full select-none flex-col gap-1 overflow-hidden`}
    >
      <div
        className="absolute right-0 top-0 cursor-pointer text-white"
        onClick={stopEditing}
      >
        <X />
      </div>
      <p className="text-white">Template Name</p>
      <input
        type="text"
        placeholder="Template Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 w-full rounded-full px-4 py-2 text-black"
      />

      <p className="text-white">Question Body</p>
      <textarea
        placeholder="Template Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="mb-2 w-full rounded-xl px-4 py-2 text-black"
      />

      <button
        type="submit"
        className="mt-4 rounded-full bg-white/50 px-10 py-3 font-semibold transition hover:bg-white/80"
        disabled={updateQuestionTemplate.isLoading}
      >
        {updateQuestionTemplate.isLoading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
