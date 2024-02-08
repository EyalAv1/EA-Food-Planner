import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import Toolbar from '../../components/Toolbar/Toolbar';
import classes from './Root.module.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import Aux from '../../hoc/Auxuliary/Auxuliary';

function RootLayout(props) {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }
    return <Aux>
        <Toolbar 
            drawToggleClicked={sideDrawerToggleHandler} />
        <Sidebar 
            open={sideDrawerIsVisible}
            closed={sideDrawerClosedHandler} />

        <main className={classes.content}>
            <Outlet />
            {/* {props.children} */}
        </main>
    </Aux>
}
export default RootLayout;