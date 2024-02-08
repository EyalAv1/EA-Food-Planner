import { useEffect, useState } from "react";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { useGetUserInfo } from './useGetUserInfo';

export const useGetMeals = () => {
    const [meals, setMeals] = useState([]);
    const [currentTotalCalories, setCurrentTotalCalories] = useState(0.0);
    const mealsCollectionRef = collection(db, "meals");
    const { userID } = useGetUserInfo();

    const getMeals = async () => {
        let unsubscribe;
        try {
            const queryMeals = query(mealsCollectionRef, where("userId", "==", userID));
            unsubscribe = onSnapshot(queryMeals, (snapshot) => {

                let docs = [];
                let currTotalCalories = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id })
                    if(data.isChecked) {
                        currTotalCalories += Number(data.calories);
                    }
                });
                setCurrentTotalCalories(currTotalCalories);
                setMeals(docs);
            });

        } catch (err) {
            console.error(err);
        }

        return () => unsubscribe();
    }

    useEffect(() => {
        getMeals() 
    },[])

    return { meals, currentTotalCalories }
}