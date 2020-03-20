import { useCallback } from "react";

export const useStorage = <T>(
  key: string
): [() => T | null, (value: T) => void] => {
  const get = useCallback(() => {
    try {
      const raw = localStorage.getItem(key);
      return JSON.parse(raw ?? "") as T;
    } catch (e) {
      return null;
    }
  }, [key]);

  const set = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return [get, set];
};
