import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Profile.module.css';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useUpdateDailyCalories } from '../../hooks/useUpdateDailyCalories';
import { useGetDailyCalories } from '../../hooks/useGetDailyCalories';
import { fb_auth } from '../../FirebaseConfig';

function Profile(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if(fb_auth.currentUser == null){
            navigate('/');
        }
    });

    const [isUpdatedCal, setIsUpdatedCal] = useState(false);

    const [dailyTotalCalories, setDailyTotalCalories] = useState(0);

    if(fb_auth.currentUser != null){
        const {userEmail, userID} = useGetUserInfo();
        const { dailyCalories} = useGetDailyCalories(userID);
        const { updateDailyCalories } = useUpdateDailyCalories();
    
        const [dailyCaloriesData] = dailyCalories;
        var calId = "";
        try {
            if(dailyCalories){
                const {userId, calories, id} = dailyCaloriesData;
                calId = id;
            }
        } catch(err) { console.error(err);}

        const updateForm = [
            <form className={classes.divUpdateCal}>
                <input placeholder='Calories Goal' type='number' onChange={(e) => setDailyTotalCalories(e.target.value)} required />
                <div className={classes.divbtn}>
                    <div className={`${classes.btn} && ${classes.btn_one}`} onClick={updateCalories}><span>Update</span></div>
                </div>
            </form>
        ];

        const updateMessage = [
            <h1>Your calorie goal has been updated</h1>
        ]

    function updateCalories () {
        if(confirm(`Are you sure you want update your calorie goal to ${dailyTotalCalories} ?`)){
            updateDailyCalories(dailyTotalCalories, calId); 
            setIsUpdatedCal(true);
            setTimeout(()=> {
                setIsUpdatedCal(false);
            }, 3000);
        }
    }
    return <>
        <h1>{userEmail} Profile 🔥</h1>
        <div className={classes.divContainer}>
            <div className={classes.outline}>
                <h2>Update your daily calorie goal:</h2>
                {!isUpdatedCal? updateForm : updateMessage}
            </div>
        </div>
    </>
    }
}

export default Profile;