import { useEffect, useState } from 'react';
import classes from './ForgetPassword.module.css';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// import FirebaseConfig from '../../../FirebaseConfig';
// import { initializeApp } from 'firebase/app';

import { fb_auth } from '../../../FirebaseConfig';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
// const app = initializeApp(FirebaseConfig);


function ForgetPassword() {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(fb_auth);

    const [email, setEmail] = useState('');
    const [isSentLink, setIsSentLink] = useState(false);
    const [message, setMessage] = useState('');

    async function handleResetPassword(e) {
        e.preventDefault();
        const success = await sendPasswordResetEmail(email);
        if(success) {
            console.log("success");
            setIsSentLink(true);
            setMessage(<h2> Check your {email} inbox or spam</h2>);
        } 
    }

    useEffect(() => {
        if(error) {
            setIsSentLink(false);
            console.log(error);
        }
    },[error]);

    return <>
        <div className={classes.header}>
            <h2>Forget Password</h2>
            <h3>enter your email. <br /> 
                if the email exist, you will get an email.</h3>
        </div>
        <div className={classes.outline}>
            <div className={classes.form}>
                {!isSentLink ?
                <form name="forget_password">
                    <input onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Your Email" /> <br />
                    <button onClick={(e) => {handleResetPassword(e)}}>Reset Password</button>
                </form> : message
                }
            </div>
        </div>
    </>
}

export default ForgetPassword;