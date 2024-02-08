import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import classes from './Sidebar.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../hoc/Auxuliary/Auxuliary'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            {/* <Backdrop closeModal={props.closed} showBackdrop={props.open}/> */}
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <div className={classes.outline}>
                    <nav className={classes.sidebarContent}>
                        <NavigationItems />
                    </nav>
                </div>
            </div>
        </Aux>
    );
};

export default sideDrawer;