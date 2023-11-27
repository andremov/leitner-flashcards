"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type PartialMPP } from "~/shared/types";

export default function EditQuestion(props: PartialMPP) {
  const { selectedQuestionId, editingModel } = props;
  const router = useRouter();

  const [answer, setAnswer] = useState(0);
  const [body, setBody] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  const { data: editingQuestion } = api.question.findOne.useQuery({
    id: selectedQuestionId ?? "",
  });

  useEffect(() => {
    if (editingQuestion) {
      console.log(editingQuestion.answer);

      setAnswer(editingQuestion.answer);
      setBody(editingQuestion.body);
      setOptions(editingQuestion.options);
      setTitle(editingQuestion.title);
    }
  }, [editingQuestion]);

  const updateQuestion = api.question.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  if (!editingQuestion || editingModel !== "question") return <></>;

  return (
    <div className="flex flex-[2_2_0%] flex-col items-center justify-center overflow-y-auto bg-slate-200 px-4 py-4">
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
        className="my-2 flex w-8/12 select-none flex-col gap-1 rounded-lg bg-slate-500 p-4 "
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
              className="mb-2 flex items-center gap-2 rounded-md bg-white px-1"
            >
              <input
                type="radio"
                // className="h-5 w-5"
                checked={index === answer}
                onClick={() => setAnswer(index)}
              />
              <div className="flex flex-1 items-center">
                <span>{index + 1}. </span>
                <input
                  className="flex-1 px-2 py-1"
                  placeholder="New answer"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions.splice(index, 1, e.target.value);
                    setOptions(newOptions);
                  }}
                />
                <input
                  type="button"
                  value="X"
                  onClick={() => {
                    const newOptions = [...options];
                    newOptions.splice(index, 1);
                    setOptions(newOptions);
                  }}
                  className="cursor-pointer rounded-md px-1.5 transition hover:bg-red-600 hover:text-white"
                />
              </div>
            </div>
          ))}
        </div>

        <input
          type="button"
          onClick={() => setOptions([...options, ""])}
          value="New answer"
          className="cursor-pointer rounded-md bg-black/30 py-1 text-white"
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
