/** Libraries **/
import { shallow } from "zustand/shallow";

/** Functional **/
import { useQuestionStore } from "~/store/questionStore";

export const useSelectQuestionState = () =>
  useQuestionStore(
    ({ questions: cardsets, updateFlashcard }) => ({
      cardsets,
      updateFlashcard,
    }),
    shallow,
  );
