import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { useGetUserInfo } from './useGetUserInfo'

export const useSetDailyCalories = () => {
    const dailyCaloriesCollectionRef = collection(db, "userDailyTotalCalories")
    const setDailyCalories = async (dailyCalories, userID) => {
        await addDoc(dailyCaloriesCollectionRef, {
            calories: dailyCalories,
            userId: userID
        })
    }
    return { setDailyCalories };
};