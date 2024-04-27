import { api } from "~/trpc/server";
import CreateQuestionButton from "../create-components/create-question";
import SimpleView from "../simple-view";
import { type PartialMPP } from "~/shared/types";
import DetailedView from "../detailed-view";

type ListQuestionsProps = PartialMPP & {
  selectedCategoryId: string;
  selectedFlashcardId: string;
};

export default async function ListQuestions(props: ListQuestionsProps) {
  const { selectedCategoryId, selectedFlashcardId, selectedQuestionId } = props;

  const questions = await api.question.getAll.query({
    flashcard: selectedFlashcardId,
  });

  const selectedFlashcard = await api.flashcard.findOne.query({
    id: selectedFlashcardId,
  });

  if (!selectedFlashcard) return <></>;

  return (
    <div
      className="flex flex-1 flex-col overflow-x-hidden bg-slate-200 px-4 py-4"
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <DetailedView data={selectedFlashcard} type="flashcard" />

      {questions && (
        <p>
          {questions.length} question{questions.length > 1 ? "s" : ""} for
          flashcard
        </p>
      )}

      <div className="my-2  flex flex-1 select-none flex-col gap-1 overflow-y-auto">
        {questions?.map((question) => (
          <SimpleView
            baseUrl={`/admin/${selectedCategoryId}/${selectedFlashcardId}/`}
            id={question.id}
            name={question.title}
            selection={selectedQuestionId}
            key={question.id}
            activeColor="bg-blue-500 text-white"
            inactiveColor="bg-blue-300"
            hasChildren
          />
        ))}
      </div>

      <CreateQuestionButton
        selectedCategoryId={selectedCategoryId}
        selectedFlashcardId={selectedFlashcardId}
      />
    </div>
  );
}
