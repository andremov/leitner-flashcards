/** Libraries **/
import { shallow } from "zustand/shallow";

/** Functional **/
import { useQuestionStore } from "~/store/questionStore";

export const useSelectQuestionState = () =>
  useQuestionStore(
    ({ questions, getPendingCount, getPendingQuestions, updateQuestion }) => ({
      questions,
      getPendingCount,
      getPendingQuestions,
      updateQuestion,
    }),
    shallow,
  );
