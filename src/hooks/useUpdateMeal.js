import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const useUpdateMeal = () => {
    const updateMeal = async (isChecked, id) => {
        const mealsDocRef = doc(db, 'meals', id);
        await updateDoc(mealsDocRef, {
            isChecked: isChecked ? false : true
        });
    }
    return { updateMeal };
}