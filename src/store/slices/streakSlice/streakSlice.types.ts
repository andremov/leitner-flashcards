// LOCAL STORAGE TYPES

export type StreakDataDayType = {
  pyd: boolean;
  rgt: number;
  wrg: number;
  rmn: number;
};

export type StreakStoreState = {
  month: number;
  currentStreak: number;
  longestStreak: number;
  days: StreakDataDayType[];
};

export type StreakSlice = StreakStoreState & {
  getTodayScore: () => StreakDataDayType;
  updateTodayScore: (modification: Partial<StreakDataDayType>) => void;
  checkState: () => void;
  getCurrentStreak: () => number;
};
