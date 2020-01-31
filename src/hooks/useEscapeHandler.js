import { useCallback, useEffect } from 'react';

export default function useEscapeHandler(callback) {
  const handleEscape = useCallback(
    ({ key }) => {
      if (key === 'Escape') {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);
}
