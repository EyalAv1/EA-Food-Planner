
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import DrawerToggle from '../Sidebar/DrawerToggle/DrawerToggle';

function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawToggleClicked}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
}
export default Toolbar;