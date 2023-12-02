"use client";

import { useEffect, useState } from "react";

export default function useLocalStorage(): [boolean, (val: boolean) => void] {
  const [didTutorial, setDidTutorial] = useState(false);

  useEffect(() => {
    setDidTutorial(localStorage.getItem("tutorial") === "true" ?? false);
  }, []);

  return [didTutorial, setDidTutorial];
}
