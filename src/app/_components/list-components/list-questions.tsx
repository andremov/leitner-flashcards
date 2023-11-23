import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/server";
import CreateQuestionButton from "../create-components/create-question";
import SimpleView from "../simple-view";
import { type PartialMPP } from "~/types/magic-page-types";
import DetailedView from "../detailed-view";

export default async function ListQuestions(props: PartialMPP) {
  const {
    selectedCardsetId,
    selectedCategoryId,
    selectedFlashcardId,
    selectedQuestionId,
  } = props;

  const questions = await api.question.getAll.query({
    flashcard: selectedFlashcardId,
  });

  const selectedFlashcard = await api.flashcard.findOne.query({
    id: selectedFlashcardId,
  });

  if (!selectedFlashcard) return <></>;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      <DetailedView data={selectedFlashcard} type="flashcard" />

      {questions && (
        <p>
          {questions.length} question{questions.length > 1 ? "s" : ""} for
          flashcard
        </p>
      )}

      <div className="my-2 flex flex-1 select-none flex-col gap-1">
        {questions?.map((question) => (
          <SimpleView
            baseUrl={`/admin/${selectedCardsetId}/${selectedCategoryId}/${selectedFlashcardId}/`}
            id={question.id}
            name={question.title}
            selection={selectedQuestionId}
            key={question.id}
            activeColor="bg-blue-500 text-white"
            inactiveColor="bg-blue-300"
          />
        ))}
      </div>

      <CreateQuestionButton {...props} />
    </div>
  );
}
