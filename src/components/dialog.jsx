import { useEffect, useRef } from "react";
import './dialog.css'

const Dialog = ({  modalState,   onClose})=>{

    const dialogRef = useRef(null);

    useEffect(()=>{
        if(modalState.show){
            dialogRef?.current.showModal()
             document.body.style.overflow = 'hidden'; // Prevents background scrolling
        }
         else {
      dialogRef.current?.close(); // Closes the dialog
      document.body.style.overflow = ''; // Restores scrolling
    }
    }, [modalState.show])
    return (
        <dialog ref={dialogRef}>
                <p onClick={onClose}>Close button</p>
            </dialog>
    )

}
export default Dialog;