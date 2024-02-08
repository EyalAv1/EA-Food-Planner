import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const useUpdateDailyCalories = () => {
    const updateDailyCalories = async (dailyCalories, id) => {
        const dailyCaloriesDocRef = doc(db, 'userDailyTotalCalories', id);
        await updateDoc(dailyCaloriesDocRef, {
            calories: dailyCalories,
        });
    }
    return { updateDailyCalories };
}