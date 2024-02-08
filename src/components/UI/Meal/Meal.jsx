import classes from './Meal.module.css';

import { useDeleteMeal } from '../../../hooks/useDeleteMeal';

function Meal(props) {
    const { deleteMeal } = useDeleteMeal();
    const onDeleteMeal = (e, mealID) => {
        e.preventDefault();
        if(confirm("Are you sure you want to delete this Meal?")){
            deleteMeal(mealID);
        }
    }
    return (
        <div className={classes.mealOutline}>
            {/* <div onClick={(e) => onDeleteMeal(e, props.mealID)}  className={classes.closeBtn}>
                <span>&times;</span>
            </div> */}
{/* 
            <div className={classes.divbtn}>
                <div onClick={(e) => onDeleteMeal(e, props.mealID)}  className={`${classes.btn} && ${classes.btn_two}`}><span><b>Delete</b></span></div>
            </div>

            <form id={props.mealID}>
                <input type='checkbox' checked={props.isChecked} onChange={(e) => props.updateCheckedMeal(e, props.isChecked, props.mealID)}/>
                <label>{props.mealDescription}</label> &nbsp;
                <label><b>|</b> {props.calories} calories</label>
            </form> */}


            <table className={classes.table_meal}>
                <tr>
                    <td>
                        <form id={props.mealID}>
                            <input type='checkbox' checked={props.isChecked} onChange={(e) => props.updateCheckedMeal(e, props.isChecked, props.mealID)} />
                            <label>{props.mealDescription}</label> &nbsp;
                            <label><b>|</b> {props.calories} calories</label>
                        </form>
                    </td>
                    <td className={classes.closeBtnContainer}>
                        <div className={classes.divbtn}>
                            <div onClick={(e) => onDeleteMeal(e, props.mealID)} className={`${classes.btn} && ${classes.btn_two}`}><span><b>Delete</b></span></div>
                        </div>
                    </td>
                </tr>
            </table>

        </div>
    );
}

export default Meal;