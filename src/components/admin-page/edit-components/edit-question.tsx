"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type PartialMPP } from "~/shared/types";
import { Pencil, Pointer, X } from "lucide-react";
import CreateQuestionTemplateButton from "../create-components/create-question-template";
import { type QuestionTemplate } from "@prisma/client";
import EditQuestionTemplate from "./edit-question-template";

export default function EditQuestion(props: PartialMPP) {
  const { selectedCardsetId, selectedQuestionId, editingModel } = props;
  const router = useRouter();

  const [editingTemplate, setEditingTemplate] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState(0);

  const { data: editingQuestion } = api.question.findOne.useQuery({
    id: selectedQuestionId,
  });

  const { data: allTemplates } = api.questionTemplate.getAll.useQuery({});

  useEffect(() => {
    if (editingQuestion) {
      setAnswer(editingQuestion.answer);
      setBody(editingQuestion.body);
      setOptions(editingQuestion.options);
      setTitle(editingQuestion.title);
    }
  }, [editingQuestion]);

  const updateQuestion = api.question.update.useMutation({
    onSuccess: () => {
      setTimeout(() => router.refresh(), 600);
    },
  });

  function selectTemplate(template: QuestionTemplate) {
    setBody(template.body);
    setTitle(template.title);
  }

  if (!editingQuestion || editingModel !== "question") return <></>;

  return (
    <div className="flex flex-[2_2_0%] flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
      <div className="my-2 flex w-8/12 select-none flex-col gap-1 rounded-lg bg-slate-500 p-4">
        {allTemplates?.map((template) => (
          <div
            className="mb-2 flex flex-col items-center rounded-md bg-white px-2 py-1"
            key={template.id}
          >
            {/* LIST QUESTION TEMPLATE FORM */}
            {editingTemplate !== template.id && (
              <div
                className={`flex h-fit w-full gap-2 overflow-hidden transition`}
              >
                <span className="flex-1">{template.title}</span>
                <button
                  className="rounded-sm transition hover:bg-black/20"
                  onClick={() => selectTemplate(template)}
                >
                  <Pointer width={20} height={20} />
                </button>
                <button
                  className="rounded-sm transition hover:bg-black/20"
                  onClick={() => {
                    setEditingTemplate(template.id);
                  }}
                >
                  <Pencil width={20} height={20} />
                </button>
              </div>
            )}

            {editingTemplate === template.id && (
              <EditQuestionTemplate
                stopEditing={() => setEditingTemplate("")}
                templateId={editingTemplate}
              />
            )}
          </div>
        ))}

        <CreateQuestionTemplateButton selectedCardsetId={selectedCardsetId!} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateQuestion.mutate({
            id: editingQuestion.id,
            answer: answer,
            body: body,
            options: options,
            title: title,
          });
        }}
        style={{
          height: editingTemplate ? "0" : "auto",
        }}
        className={`my-2 flex w-8/12 select-none flex-col gap-1 overflow-hidden rounded-lg bg-slate-500 transition ${
          editingTemplate ? "h-0" : "h-fit p-4"
        }`}
      >
        <p className="text-white">Question Name</p>
        <input
          type="text"
          placeholder="Question Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 w-full rounded-full px-4 py-2 text-black"
        />

        <p className="text-white">Question Body</p>
        <textarea
          placeholder="Question Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mb-2 w-full rounded-xl px-4 py-2 text-black"
        />

        <p className="text-white">Options</p>
        <div>
          {options?.map((option, index) => (
            <div
              key={index}
              className="mb-2 flex items-center gap-2 rounded-md bg-white pl-2"
            >
              <input
                type="radio"
                // className="h-5 w-5"
                checked={index === answer}
                onClick={() => setAnswer(index)}
              />
              <div className="flex flex-1 items-center gap-1">
                <span>{index + 1}. </span>
                <input
                  className="w-full px-2 py-1"
                  placeholder="New answer"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions.splice(index, 1, e.target.value);
                    setOptions(newOptions);
                  }}
                />
                <div
                  onClick={() => {
                    const newOptions = [...options];
                    newOptions.splice(index, 1);
                    setOptions(newOptions);
                  }}
                  className="cursor-pointer rounded-sm p-1 transition hover:bg-red-600 hover:text-white"
                >
                  <X />
                </div>
              </div>
            </div>
          ))}
        </div>

        <input
          type="button"
          onClick={() => setOptions([...options, ""])}
          value="New answer"
          className="cursor-pointer rounded-md bg-black/30 py-1 text-white transition hover:bg-black/50"
        />

        <button
          type="submit"
          className="mt-4 rounded-full bg-white/50 px-10 py-3 font-semibold transition hover:bg-white/80"
          disabled={updateQuestion.isLoading}
        >
          {updateQuestion.isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
