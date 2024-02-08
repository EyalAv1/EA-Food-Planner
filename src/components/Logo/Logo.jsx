// import React from 'react';

import webLogo from '../../assets/EAFP-logo.png';
import classes from './Logo.module.css';

function Logo() {
    return (
        <>
        <div className={classes.Logo}>
            <img src={webLogo} alt="MyLogo" />
        </div>
        </>
    );
}

// function Logo() {
//     return (
//         <img src="src/assets/EAFP-logo.png" alt="MyLogo" />
//     );
// }

export default Logo;