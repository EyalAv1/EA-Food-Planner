import classes from './Backdrop.module.css';

const Backdrop = ({closeModal,showBackdrop}) => {
    return <div onClick={closeModal} className={`${classes.backdrop} ${showBackdrop && classes.showBackdrop}`}></div>
}

export default Backdrop;