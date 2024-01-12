/** Libraries **/
import { shallow } from "zustand/shallow";

/** Functional **/
import { useStreakStore } from "~/store/streakStore";

export const useSelectStreakState = () =>
  useStreakStore(
    (store) => ({
      ...store,
    }),
    shallow,
  );
