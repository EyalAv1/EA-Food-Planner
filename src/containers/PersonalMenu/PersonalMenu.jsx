import { useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid'
import classes from './PersonalMenu.module.css'
import Meal from '../../components/UI/Meal/Meal';
import Modal from '../../components/Modal/Modal';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { fb_auth, db } from '../../FirebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { useAddMeal } from '../../hooks/useAddMeal';
import { useGetMeals } from '../../hooks/useGetMeals';
import { useUpdateMeal } from '../../hooks/useUpdateMeal';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import {useGetDailyCalories} from '../../hooks/useGetDailyCalories';

/* idea :
    create lists of food and let the person to enter the meal he wants. 
    create a check box that if meal ticked the calories of the meal is added to the calories amount of the day.
    flipped cards to show the meals for the user to choose.
*/




const PersonalMenu = (props) => {
    // onAuthStateChanged()
    const { addMealsToDB } = useAddMeal();
    const { meals, currentTotalCalories } = useGetMeals();
    const { updateMeal } = useUpdateMeal();

    const uniqueId = uuidv4();
    
    const [addMeal, setAddMeal] = useState(false);
    // const [showAddMealForm, setShowAddMealForm] = useState(false);
    
    const [mealDescription, setMealDescription] = useState('');
    const [mealKind, setMealKind] = useState('1');
    const [mealCalories, setMealCalories] = useState(0);
    // const [caloriesProgressPercentage, setCaloriesProgressPercentage] = useState(0);
    
    // const [breakfastMeals, setBreakfastMeals] = useState([]);
    // const [lunchMeals, setLunchMeals] = useState([]);
    // const [dinnerMeals, setDinnerMeals] = useState([]);
    // const [snakesMeals, setSnakesMeals] = useState([]);

    const { userID} = useGetUserInfo();
    const { dailyCalories} = useGetDailyCalories(userID);
    const [dailyCaloriesData] = dailyCalories;
    var Totcalories = "";
    try {
        if(dailyCalories){
            const {userId, calories, id} = dailyCaloriesData;
            Totcalories = calories;
        }
    } catch(err) { console.error(err);}
    
    
    
    // const [fetchMeals, setFetchMeals] = useState([]);
    // var userId = "";
    // async function init() {
        
    //     onAuthStateChanged(fb_auth, (user) => {
    //         if (user) {
    //             userId = user.uid;
    //             setBreakfastMeals(props.breakfastMeals);
    //             setLunchMeals(props.lunchtMeals);
    //             setDinnerMeals(props.dinnertMeals);
    //             setSnakesMeals(props.snackestMeals);
    //             // console.log(breakfastMeals);
    //             setCaloriesProgressPercentage(parseFloat(totalCalories)/props.UserTotalCalories);
    //         } else {
    //             console.log("problemas :(");
    //         }
    //     })
    // }
    
    // useEffect(() => {
    //     init();
    // });
    
    // function calaCurrentTotalCalories() {
    //     const totalCal = meals.filter((meal) => meal.isChecked).reduce((acc, o) => acc + parseInt(o.calories), 0);
    //     try{
    //         setCaloriesProgressPercentage(totalCal/props.UserTotalCalories);
    //     } catch (err) {
    //         console.error(err);
    //     }
    //     return totalCal;
    // }
    
    // const [totalCalories, setTotalCalories] = useState(0);

    // const mealsCollectionRef = query(collection(db, "meals"), where("userId", "==", fb_auth.currentUser.uid));

    // const getMealsList = async () => {
    //     const querySnapshot = await getDocs(mealsCollectionRef);
    //     const filteredData = querySnapshot.docs.map((doc) => ({
    //                 ...doc.data(),
    //                 id: doc.id
    //     }));
            
    //     setFetchMeals(filteredData);
    //     console.log(filteredData);
    //     initiateBreakfastMeals = filteredData.filter((meal) => meal.mealTypep == '1').map((obj) => (
    //         {
    //             mealId: obj.mealId,
    //             mealDescription: obj.mealDescription,
    //             calories: obj.calories,
    //             isChecked: obj.isChecked
    //         }
    //         ));
    //         console.log(initiateBreakfastMeals);
    //     setBreakfastMeals([ ...initiateBreakfastMeals, ...breakfastMeals]);
    //     fb_auth.onAuthStateChanged((user) => {
    //         try{
    //             const userCurrentCalories = initiateBreakfastMeals.filter((meal) => meal.isChecked).reduce((acc, o) => acc + parseInt(o.calories), 0);
    //             setTotalCalories(parseFloat(userCurrentCalories));
    //             setCaloriesProgressPercentage(userCurrentCalories/props.UserTotalCalories);
    //         } catch(err) { console.error(err); }           
    //     });
    // }

    // useEffect(() => {
    //     getMealsList();
    // }, [])
    
    function selectedVal() {
        var d = document.getElementById("mealKind").value;
        setMealKind(d);
    }

    function addMealSwitch() {
        setAddMeal(!addMeal);
    }

    // async function totalCaloriesHamdler(e, mealid, mealKind) {
    //     /* get the meal id and add the meal calories to the total calories */
    //     /* make sure to let the user know that he over his total calories for today */
    //     let mealindx;
    //     let caloriesProgress;
    //     switch(mealKind) {
    //         case '1': {
    //             mealindx = breakfastMeals.findIndex((m) => m.mealId==mealid);
    //             let temp = 0;
    //             if(breakfastMeals[mealindx].isChecked){
    //                 breakfastMeals[mealindx].isChecked = false;
    //                 setBreakfastMeals([...breakfastMeals]);
    //                 temp = parseInt(totalCalories) - breakfastMeals[mealindx].calories;
    //                 if(temp < 0)
    //                     temp = 0;
    //                 // caloriesProgress = temp/props.UserTotalCalories;
    //             }
    //             else {
    //                 breakfastMeals[mealindx].isChecked = true;
    //                 setBreakfastMeals([...breakfastMeals]);
    //                 temp = parseInt(totalCalories) + parseInt(breakfastMeals[mealindx].calories);
    //                 setTotalCalories(temp);
    //             }
    //             caloriesProgress = temp/props.UserTotalCalories;
    //         }
    //         break;

    //         case '2': {
    //             mealindx = lunchMeals.findIndex((m) => m.mealId==mealid);
    //             let temp = 0;
    //             if(lunchMeals[mealindx].isChecked){
    //                 lunchMeals[mealindx].isChecked = false;
    //                 setLunchMeals([...lunchMeals]);
    //                 temp = parseInt(totalCalories) - lunchMeals[mealindx].calories;
    //                 if(temp < 0)
    //                 temp = 0;
    //                 setTotalCalories(temp);
    //             }
    //             else {
    //                 lunchMeals[mealindx].isChecked = true;
    //                 setLunchMeals([...lunchMeals]);
    //                 temp = parseInt(totalCalories) + parseInt(lunchMeals[mealindx].calories);
    //                 setTotalCalories(temp);
    //             }    
    //             caloriesProgress = temp/props.UserTotalCalories;
    //         }
    //         break;

    //         case '3': {
    //             mealindx = dinnerMeals.findIndex((m) => m.mealId==mealid);
    //             let temp = 0;
    //             if(dinnerMeals[mealindx].isChecked){
    //                 dinnerMeals[mealindx].isChecked = false;
    //                 setDinnerMeals([...dinnerMeals]);
    //                 temp = parseInt(totalCalories) - dinnerMeals[mealindx].calories;
    //                 if(temp < 0)
    //                 temp = 0;
    //                 setTotalCalories(temp);
    //             }
    //             else {
    //                 dinnerMeals[mealindx].isChecked = true;
    //                 setDinnerMeals([...dinnerMeals]);
    //                 temp = parseInt(totalCalories) + parseInt(dinnerMeals[mealindx].calories);
    //                 setTotalCalories(temp);
    //             }
    //             caloriesProgress = temp/props.UserTotalCalories;
    //         }
    //         break;

    //         case '4':  {
    //             mealindx = snakesMeals.findIndex((m) => m.mealId==mealid);
    //             let temp = 0;
    //             if(snakesMeals[mealindx].isChecked){
    //                 snakesMeals[mealindx].isChecked = false;
    //                 setSnakesMeals([...snakesMeals]);
    //                 temp = parseInt(totalCalories) - snakesMeals[mealindx].calories;
    //                 if(temp < 0)
    //                 temp = 0;
    //                 setTotalCalories(temp);
    //             }
    //             else {
    //                 snakesMeals[mealindx].isChecked = true;
    //                 setSnakesMeals([...snakesMeals]);
    //                 temp = parseInt(totalCalories) + parseInt(snakesMeals[mealindx].calories);
    //                 setTotalCalories(temp);
    //             }
    //             caloriesProgress = temp/props.UserTotalCalories;     
    //         }
    //         break;
    //         default: mealindx = 0;
    //     };
    //     // let caloriesProgress = parseFloat(totalCalories)/props.UserTotalCalories;
    //     setCaloriesProgressPercentage(caloriesProgress);
    // }

    async function addMealHandler(e) {
        e.preventDefault();
        // const mealsCollectionRef = query(collection(db, "meals")); 
        switch(mealKind) {
            case '1': {
                let mealObj = {
                    mealId: uniqueId,
                    mealDescription: mealDescription,
                    calories: mealCalories,
                    isChecked: false
                };
                // setBreakfastMeals([ ...breakfastMeals, mealObj ]);
                onAuthStateChanged(fb_auth, (user) => {
                    if (user) {
                        // onSubmitMeal(mealsCollectionRef, '1', mealObj, user.uid);
                        addMealsToDB({mealKind: '1', calories: mealObj.calories, isChecked: false, mealDescription: mealObj.mealDescription, mealId: mealObj.mealId})
                    } else {
                        console.log("problemas in add breakfast:(");
                    }
                })
            }
            break;

            case '2': {
                let mealObj = {
                    mealId: uniqueId,
                    mealDescription: mealDescription,
                    calories: mealCalories,
                    isChecked: false
                };
                // setLunchMeals([ ...lunchMeals, mealObj ]);
                onAuthStateChanged(fb_auth, (user) => {
                    if (user) {
                        // onSubmitMeal(mealsCollectionRef, '1', mealObj, user.uid);
                        addMealsToDB({mealKind: '2', calories: mealObj.calories, isChecked: false, mealDescription: mealObj.mealDescription, mealId: mealObj.mealId})
                    } else { console.log("problemas in add lunch:("); }
                })
            }
            break;

            case '3': {
                let mealObj = {
                    mealId: uniqueId,
                    mealDescription: mealDescription,
                    calories: mealCalories,
                    isChecked: false
                };
                // setDinnerMeals([  ...dinnerMeals, mealObj ]);
                onAuthStateChanged(fb_auth, (user) => {
                    if (user) {
                        // onSubmitMeal(mealsCollectionRef, '1', mealObj, user.uid);
                        addMealsToDB({mealKind: '3', calories: mealObj.calories, isChecked: false, mealDescription: mealObj.mealDescription, mealId: mealObj.mealId})
                    } else { console.log("problemas in add dinner:("); }
                })
            }
            break;

            case '4': {
                let mealObj = {
                    mealId: uniqueId,
                    mealDescription: mealDescription,
                    calories: mealCalories,
                    isChecked: false
                };
                // setSnakesMeals([  ...snakesMeals, mealObj ]);
                onAuthStateChanged(fb_auth, (user) => {
                    if (user) {
                        // onSubmitMeal(mealsCollectionRef, '1', mealObj, user.uid);
                        addMealsToDB({mealKind: '4', calories: mealObj.calories, isChecked: false, mealDescription: mealObj.mealDescription, mealId: mealObj.mealId})
                    } else { console.log("problemas in add snackes:("); }
                })
            }
            break;

            default: console.log("error");
        };
        setAddMeal(false)
        setMealCalories(0);
        setMealDescription('');
    }

    // function convertMealsData(mealsData, mealKind){
    //     // console.log(mealsData);
    //     const templst = mealsData.map((meal) => (
    //         <div id={meal.mealId}>
    //             <input type='checkbox' checked={meal.isChecked? true : false} onChange={(e) => totalCaloriesHamdler(e, meal.mealId, mealKind)}/>
    //             <label>{meal.mealDescription}</label> &nbsp;
    //             <label><b>Calories:</b> {meal.calories}</label>
    //         </div>
    //     ));
    //     return templst;
    // }

    const addMealFrom = [
        <form action='' className={classes.addMealFrom}>
            <h2>Add your meal:</h2>
            <input id="mealdescription" type='text' placeholder='Your Meal Description' name="mealdescription" onChange={(e) => {setMealDescription(e.target.value)}}/>
            <select id="mealKind" onChange={selectedVal} >
                <option value="1">Breakfast</option>
                <option value="2">Lunch</option>
                <option value="3">Dinner</option>
                <option value="4">Snakes</option>
            </select>
            <input type="number"  placeholder='Calories Of The Meal' onChange={(e) => setMealCalories(e.target.value)}/>
            <div className={classes.divbtn}>
                    <div class={`${classes.btn} && ${classes.btn_one}`} onClick={(e) => addMealHandler(e)}><span>Add</span></div>
            </div>
        </form>
    ];

    var breakfastMealsList = [];
    var lunchMealsList = [];
    var dinnerMealsList = [];
    var snakesMealsList = [];

    async function updateCheckedMeal(e, isChecked, id) {
        e.preventDefault();
        await updateMeal(isChecked, String(id));
    }

    function convertMealData(meal) {
        return <li className={classes.mealLiItem}>
                <Meal
                mealID = {meal.id}
                mealDescription = {meal.mealDescription}
                calories = {meal.calories}
                isChecked = {meal.isChecked}
                updateCheckedMeal = {updateCheckedMeal}
                /></li> 
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.menu}>
                    <h1>Your Personal Menu</h1>
                    <div>
                        <h1>Breakfast</h1>
                        <div className={classes.menuItems}>
                            <ul >{breakfastMealsList = meals.filter((meal) => meal.mealTypep == '1').map((meal) => {
                                                return convertMealData(meal)
                                            })}</ul>
                            {/* <ul>{breakfastMealsList = convertMealData('1')}</ul> */}
                            {breakfastMealsList.length == 0 ? "Add your breakfast meals" : undefined}
                        </div>
                    </div>
                    <div>
                        <h1>Lunch</h1>
                        <div className={classes.menuItems}>
                            <ul>{lunchMealsList = meals.filter((meal) => meal.mealTypep == '2').map((meal) => {
                                                return convertMealData(meal)
                                            })}</ul>
                            {lunchMealsList.length == 0 ? "Add your lunch meals" : undefined}
                        </div>
                    </div>
                    <div>
                        <h1>Dinner</h1>
                        <div className={classes.menuItems}>
                            <ul >{dinnerMealsList = meals.filter((meal) => meal.mealTypep == '3').map((meal) => {
                                                return convertMealData(meal)
                                            })}</ul>
                            {dinnerMealsList.length == 0 ? "Add your dinner meals": undefined}
                        </div>
                    </div>
                    <div>
                        <h1>Snakes</h1>
                        <div className={classes.menuItems}>
                            <ul>{snakesMealsList = meals.filter((meal) => meal.mealTypep == '4').map((meal) => {
                                                return convertMealData(meal)
                                            })}</ul>
                            {snakesMealsList.length == 0 ? "Add your snakes meals" : undefined}
                    </div>
                </div>
                </div>
                
                <div className={classes.divbtn}>
                    <div className={`${classes.btn} && ${classes.btn_one}`} onClick={addMealSwitch}><span>Add Meal</span></div>
                </div>


                {/* {addMeal ? addMealFrom : undefined} */}
                {addMeal && 
                    <Modal setShowModal={setAddMeal} > 
                        {addMealFrom}
                    </Modal>}
                <div className={classes.totalCaloriesOutline}>
                    <h2>Your Total Calories For Today:</h2>
                    <div className={classes.totalCalories}>
                        <CircularProgressbarWithChildren styles={{path: { stroke: `${currentTotalCalories >= Totcalories ? '#A41010' : currentTotalCalories/Totcalories >= 0.8 ? '#CA7743' : '#1A7D37'}`}}} minValue={0} maxValue={1} value={currentTotalCalories / Totcalories}>
                            <div className={classes.CircularProgressbarcontent}>{currentTotalCalories}</div>
                            <div>{((currentTotalCalories / Totcalories) * 100).toFixed(2)}%</div>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonalMenu;