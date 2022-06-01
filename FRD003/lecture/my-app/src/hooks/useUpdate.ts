import { useEffect } from "react";

export function useUpdate(fn: () => void) {
  useEffect(fn)
}
