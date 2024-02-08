import { NavLink } from 'react-router-dom';
import classes from './NavigationItems.module.css';
// import { signOut, getAuth } from 'firebase/auth';
// import { useContext } from "react";
// import { Context } from '../../../context/AuthContext';

import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { fb_auth } from '../../../FirebaseConfig';

function NavigationItems() {
    // const {user} = useContext(Context);

    const [signOut] = useSignOut(fb_auth);
    const [user] = useAuthState(fb_auth);

    async function handleSignOut() {
        try {
            await signOut();
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li className={classes.list}>
                        <NavLink 
                            to="/" 
                            className={({isActive}) => (isActive? classes.active: undefined)}
                            end 
                            >Home</NavLink>
                    </li>
                    <li className={classes.list}>
                        <NavLink 
                            to="/PersonalMenu" 
                            className={({isActive}) => (isActive? classes.active: undefined)}
                            >Personal Menu</NavLink>
                    </li>
                    {/* <li className={classes.list}>
                    
                    </li> */}
                    <li className={classes.list}>
                        {!user? undefined: <NavLink to="/Profile">Profile</NavLink>}
                        {!user ?
                        <NavLink 
                            to="/Auth" 
                            className={({isActive}) => (isActive? classes.active: undefined)}
                            >Log In</NavLink> :
                            <NavLink to="/"
                                    // className={({isActive}) => (isActive? classes.active: undefined)}
                                    onClick={()=>{handleSignOut()}}>Log Out</NavLink>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavigationItems;