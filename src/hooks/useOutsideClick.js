import { useEffect, useCallback } from 'react';

export default function useOutsideClick(selector, onOutsideClick) {
  const handleOutsideClick = useCallback(
    ({ target }) => {
      if (target.closest(selector) === null) {
        onOutsideClick();
      }
    },
    [selector, onOutsideClick]
  );

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [handleOutsideClick]);
}
