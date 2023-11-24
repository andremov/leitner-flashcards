import { api } from "~/trpc/server";
import { type PartialMPP } from "~/types/magic-page-types";
import DetailedView from "../detailed-view";

export default async function ViewQuestion(props: PartialMPP) {
  const { selectedQuestionId } = props;

  const selectedQuestion = await api.question.findOne.query({
    id: selectedQuestionId,
  });

  if (!selectedQuestion) return <></>;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-slate-200 px-4 py-4">
      <DetailedView data={selectedQuestion} type="question" />
    </div>
  );
}
