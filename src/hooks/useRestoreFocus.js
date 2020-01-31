import { useEffect } from 'react';

export default function useRestoreFocus() {
  useEffect(() => {
    const active = document.activeElement;
    return () => {
      if (active) active.focus();
    };
  });
}
