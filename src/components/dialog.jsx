// components/dialog.jsx
import { useEffect, useRef } from "react";
import './dialog.css';

const Dialog = ({ modalState }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (modalState.show) {
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = '';
    }
  }, [modalState.show]);

  // If not shown, don't render anything
  if (!modalState.show) {
    return null;
  }

  return (
    <dialog ref={dialogRef}>
      {modalState.data}
    </dialog>
  );
};

export default Dialog;