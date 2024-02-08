import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { useGetUserInfo } from './useGetUserInfo'

export const useAddMeal = () => {
    const mealsCollectionRef = collection(db, "meals")
    const { userID } = useGetUserInfo();
    // console.log(userID);
    const addMealsToDB = async ({mealKind, calories, isChecked, mealDescription, mealId}) => {
        await addDoc(mealsCollectionRef, {
            mealTypep: mealKind,
            calories: calories,
            isChecked: isChecked,
            mealDescription: mealDescription,
            mealId: mealId,
            userId: userID
        })
    }
    return { addMealsToDB };
};