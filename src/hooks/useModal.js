import { useEffect } from 'react';
import useEscapeHandler from './useEscapeHandler';
import useOutsideClick from './useOutsideClick';
import useRestoreFocus from './useRestoreFocus';

export default function useModal(firstElementRef, onDismiss) {
  useEscapeHandler(onDismiss);
  useOutsideClick('.Modal__content', onDismiss);
  useRestoreFocus();

  useEffect(() => {
    if (firstElementRef.current) {
      firstElementRef.current.focus();
    }
  }, [firstElementRef.current]);
}
