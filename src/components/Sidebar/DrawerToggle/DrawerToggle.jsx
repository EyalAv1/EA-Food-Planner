import React from 'react';

import classes from './DrawerToggle.module.css';

//import burgerLogo from '../../assets/images/burger-logo.png';

const DrawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;