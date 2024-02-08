import { useEffect, useState } from "react";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { useGetUserInfo } from './useGetUserInfo';

export const useGetDailyCalories = (userID) => {
    const [dailyCalories, setDailyCalories] = useState([]);
    // var dailyCalories = [];
    const dailyCaloriesCollectionRef = collection(db, "userDailyTotalCalories");
    // const { userID } = useGetUserInfo();
    
    const getDailyCalories = async (userID) => {
        let unsubscribe;
        try {
            const queryDailyCalories = query(dailyCaloriesCollectionRef, where("userId", "==", userID));
            unsubscribe = onSnapshot(queryDailyCalories, (snapshot) => {

                let docs = [];

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id })

                });
                setDailyCalories(docs);
            });

        } catch (err) {
            console.error(err);
        }
        console.log(dailyCalories);

        return () => unsubscribe();
    }

    useEffect(() => {
        getDailyCalories(userID)
    },[])
    return { dailyCalories }
}