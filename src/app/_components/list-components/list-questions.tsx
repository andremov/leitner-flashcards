import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/server";
import CreateQuestionButton from "../create-components/create-question";

export default async function ListQuestions(props: {
  selectedCardsetId?: string;
  selectedCategoryId?: string;
  selectedFlashcardId?: string;
}) {
  const { selectedFlashcardId } = props;

  const questions = await api.question.getAll.query({
    flashcard: selectedFlashcardId,
  });

  if (!selectedFlashcardId) return <></>;

  return (
    <div className="flex w-full flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      {questions && <p>{questions.length} questions for flashcard</p>}

      <div className="my-2 flex flex-1 select-none flex-col gap-1">
        {questions?.map((question) => (
          <div
            key={question.id}
            className={`rounded-md px-4 py-2 transition ${
              selectedFlashcardId === question.id
                ? "bg-purple-500 text-white"
                : "bg-purple-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{question.title}</span>
              <div className="flex gap-2">
                {/* <Link
                  href={`/admin?cardset=${question.id}`}
                  className="w-6 rounded-sm transition hover:bg-black/20"
                >
                  <ExternalLink className="mx-auto w-5" />
                </Link> */}
                <Link
                  href={`/admin?cardset-edit=${question.id}`}
                  className="w-6 rounded-sm transition hover:bg-black/20"
                >
                  <Pencil className="mx-auto w-5" />
                </Link>
                <Link
                  href={`/admin?cardset-delete=${question.id}`}
                  className="w-6 rounded-sm transition hover:bg-red-500/40"
                >
                  <Trash className="mx-auto w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateQuestionButton {...props} />
    </div>
  );
}
