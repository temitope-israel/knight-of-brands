"use client";

import { useEffect } from "react";

// Module-level counter shared across every component using this hook.
// This is what prevents independent lock/unlock calls from stomping on
// each other: scroll only unlocks once nothing is holding a lock anymore.
let lockCount = 0;

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    lockCount += 1;
    document.body.style.overflow = "hidden";

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = "";
      }
    };
  }, [isLocked]);
}