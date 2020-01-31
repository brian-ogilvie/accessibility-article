import { useEffect, useCallback } from 'react';

export default function useOutsideClick(selector, callback) {
  const handleOutsideClick = useCallback(
    ({ target }) => {
      if (!target.closest(selector)) {
        callback();
      }
    },
    [selector, callback]
  );

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  });
}
