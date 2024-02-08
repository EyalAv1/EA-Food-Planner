import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, where, query} from 'firebase/firestore';
import { ref, push, update, remove} from "firebase/database";
import { fb_auth, db, database } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";


export const FirebaseDataHandler = (setLst) => {
    var uid = "";
    var mealsCollectionRef = query(collection(db, "meals"));
    onAuthStateChanged(fb_auth, (user) => {
        if (user) {
            uid = user.uid;
            // console.log("type;" + typeof (uid) + "   uid:" + uid);
            mealsCollectionRef = query(collection(db, "meals"), where("userId", "==", uid));
        } else {
            console.log("not good");
        }
    });
    const getMealsList = async () => {
        await getDocs(mealsCollectionRef)
            .then((querySnapshot) => {
                const filteredData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setLst(filteredData);
                // console.log(filteredData);
            })
    };
    useEffect(() => {
        getMealsList();
    }, [])
}

export const onSubmitMeal = async (CollectionRef, mealKind, mealObject, userId) => {
    try {
        await addDoc(CollectionRef, {
            mealTypep: mealKind,
            calories: mealObject.calories,
            isChecked: mealObject.isChecked,
            mealDescription: mealObject.mealDescription,
            mealId: mealObject.mealId,
            userId: userId
        });
    } catch (err) {
        console.error(err);
    }
}

// export async function writeMealsData(mealKind, mealObject, userId) {
//     try{
//         set(ref(database, 'meals/' + userId), {
//             mealTypep: mealKind,
//             calories: mealObject.calories,
//             isChecked: mealObject.isChecked,
//             mealDescription: mealObject.mealDescription,
//             mealId: mealObject.id,
//             userId: userId
//         });
//     } catch(err) { console.error(err); }
//   }

export const createItem = (path, body) => push(ref(database, path), body);
export const updateItem = (path, id, body) => update(ref(database, `${path}/${id}`), body);
export const removeItem = (path, id) => remove(ref(database, `${path}/${id}`));
