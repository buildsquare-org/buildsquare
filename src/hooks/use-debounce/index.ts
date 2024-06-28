import { useEffect, useState } from "react";

export function useDebounce<T>({
  state,
  delay = 500,
}: {
  state: T;
  delay?: number;
}): [T] {
  const [value, setValue] = useState<T>(state);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setValue(state);
    }, delay);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [state]);

  return [value];
}
