import useEscapeHandler from './useEscapeHandler';
import useOutsideClick from './useOutsideClick';
import useFocusTransfer from './useFocusTransfer';

export default function useModal(firstElementRef, contentSelector, onDismiss) {
  useEscapeHandler(onDismiss);
  useOutsideClick(contentSelector, onDismiss);
  useFocusTransfer(firstElementRef);
}
