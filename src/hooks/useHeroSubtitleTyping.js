import { useEffect, useMemo, useState } from "react";

export function useHeroSubtitleTyping(text, lang) {
  const canType = useMemo(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(max-width: 700px)").matches &&
      lang === "zh",
    [lang],
  );
  const [typedCount, setTypedCount] = useState(canType ? 0 : text.length);

  useEffect(() => {
    if (!canType) {
      setTypedCount(text.length);
      return undefined;
    }

    setTypedCount(0);
    const START = 350;
    const DELAY = 55;
    const timers = [];

    for (let index = 0; index <= text.length; index += 1) {
      timers.push(
        window.setTimeout(
          () => setTypedCount(index),
          START + index * DELAY,
        ),
      );
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [canType, text]);

  return {
    canType,
    isDone: typedCount >= text.length,
    typedCount,
  };
}
