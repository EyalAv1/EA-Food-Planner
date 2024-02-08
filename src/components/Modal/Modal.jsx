import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';
import { useEffect, useState } from 'react';

const Modal = (props) => {

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true)
    },[])
    
    const closeModal = () => {
        setShowContent(false);
        setTimeout(() => {
           props.setShowModal(false); 
        }, 500)
    }
    return <>
        <Backdrop showBackdrop={showContent} closeModal={closeModal} />
        <div className={`${classes.modal} ${showContent && classes.showModal}`}>
            <div onClick={closeModal} className={classes.closeBtn}>
                <span>&times;</span>
            </div>
            <div className={classes.modalBody}>
                {props.children}
            </div>
        </div>
    </>
}

export default Modal;