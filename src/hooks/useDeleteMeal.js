import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const useDeleteMeal = () => {
    const deleteMeal = async (mealID) => {
        await deleteDoc(doc(db, "meals", mealID));
    }
    return { deleteMeal };
}