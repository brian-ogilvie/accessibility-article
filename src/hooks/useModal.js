import useEscapeHandler from './useEscapeHandler';
import useOutsideClick from './useOutsideClick';
import useFocusTransfer from './useFocusTransfer';

export default function useModal(firstElementRef, onDismiss) {
  useEscapeHandler(onDismiss);
  useOutsideClick('.Modal__content', onDismiss);
  useFocusTransfer(firstElementRef);
}
