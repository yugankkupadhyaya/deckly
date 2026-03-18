'use client';

import { useEffect, RefObject } from 'react';

export function useAutoResizeTextarea(
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string | undefined,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled || !ref.current) return;

    const el = ref.current;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value, enabled, ref]);
}
