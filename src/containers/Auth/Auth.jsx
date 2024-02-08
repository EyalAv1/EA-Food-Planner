import classes from './Auth.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import Modal from '../../components/Modal/Modal';

import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { fb_auth } from '../../FirebaseConfig';
import { useSetDailyCalories } from '../../hooks/useSetDailyCalories';


function Auth(props) {
    
    const navigate = useNavigate();

    useEffect(() => {
        if(fb_auth.currentUser != null){
            navigate('/');
        }
    }) 

    const { setDailyCalories } = useSetDailyCalories();

    const [isSignup, setIsSignup] = useState(true);
    const [resetPassword, setResetPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dailyTotalCalories, setDailyTotalCalories] = useState('');

    const [createUserWithEmailAndPassword, signUpUser, signUPLoading, signUPError] = useCreateUserWithEmailAndPassword(fb_auth);
    const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] = useSignInWithEmailAndPassword(fb_auth);

    const logInForm = [
        <form action='' name='Log_In'>
            <input onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email"/>
            <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
            {/* <button onClick={(e) => {handleSignIn(e)}}>Log In</button> */}

            <div className={classes.divbtn}>
                <div className={`${classes.btn} && ${classes.btn_three}`} onClick={(e) => {handleSignIn(e)}}>
                    <span>Sign In</span>
                </div>
            </div>


        </form>];

    const SignUpForm = [
        <form action='' name='Sign_Up'>
            <input onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" required/>
            <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" required/>
            <input onChange={(e) => {setDailyTotalCalories(e.target.value)}} type="number" placeholder="Yout Total Daily Calories" required/>
            {/* <button onClick={(e) => {handleSignUp(e)}}>Sign Up</button> */}

            <div className={classes.divbtn}>
                <div className={`${classes.btn} && ${classes.btn_three}`} onClick={(e) => {handleSignUp(e)}}>
                    <span>Sign Up</span>
                </div>
            </div>
        </form>];

    

    async function handleSignUp(e) {
        e.preventDefault();
        const result = await createUserWithEmailAndPassword(email,password);
        console.log(result);
        const authInfo = {
            userEmail: result.user.email,
            userID: result.user.uid,
            isAuth: true,
            dailyTotalCalories: dailyTotalCalories
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        setDailyCalories(dailyTotalCalories, String(result.user.uid));
    }

    useEffect(() => {
        if(signUpUser) {
            navigate('/');
        }
    },[signUpUser,navigate]);

    useEffect(() => {
        if(signUPError) {
            alert(signUPError.code);
        }
    },[signUPError]);

    async function handleSignIn(e) {
        e.preventDefault();
        const result = await signInWithEmailAndPassword(email,password);
        const authInfo = {
            userEmail: result.user.email,
            userID: result.user.uid,
            isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
    }

    useEffect(() => {
        if(signInUser) {
            navigate('/');
        }
    },[signInUser,navigate]);

    useEffect(() => {
        if(signInError) {
            alert(signInError.code);
        }
    },[signInError]);

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }


    return (
        <>
            
            <div className={classes.div_container_outline}>

                {resetPassword && 
                    <Modal setShowModal={setResetPassword} > 
                        <ForgetPassword/>
                    </Modal>}

                <div className={classes.div_container}>
                    {isSignup ? <p className={classes.form_title}><b>Log In</b></p> : <p className={classes.form_title}><b>Sign Up</b></p>}
                    {isSignup ? logInForm : SignUpForm}
                    {isSignup ? <label>Not registered? <a href='#' onClick={switchAuthModeHandler}>Click here to sign up</a></label> :
                        <label>Already registered? <a href='#' onClick={switchAuthModeHandler}>Click here to Log In</a></label>
                    }
                    <br />
                    <label><a href='#' onClick={() => { setResetPassword(!resetPassword) }}>Forget My Password</a></label>
                </div>
            </div>
        </>
    );
}

export default Auth;