import { useCallback, useEffect } from 'react';

export default function useEscapeHandler(onEscape) {
  const handleEscape = useCallback(
    ({ key }) => {
      if (key === 'Escape') {
        onEscape();
      }
    },
    [onEscape]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);
}
