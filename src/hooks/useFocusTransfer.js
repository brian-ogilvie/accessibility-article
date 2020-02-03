import { useEffect } from 'react';

export default function useFocusTransfer(transferToRef) {
  useEffect(() => {
    const active = document.activeElement;
    return () => {
      if (active) active.focus();
    };
  }, []);

  useEffect(() => {
    if (transferToRef.current) {
      transferToRef.current.focus();
    }
  }, [transferToRef.current]);
}
