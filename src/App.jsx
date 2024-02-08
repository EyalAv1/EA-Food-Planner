import './App.css'
import {useEffect, useState} from 'react';

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './containers/HomePage/HomePage'
import PersonalMenu from './containers/PersonalMenu/PersonalMenu'
import Auth from './containers/Auth/Auth'
import RootLayout from './containers/Root/Root'
import AuthContext from './context/AuthContext';
import Protected from './components/Navigation/Protected'
import Profile from './containers/Profile/Profile.jsx';

import { FirebaseDataHandler } from './Firebase/FirebaseDataHandler.jsx';
import { fb_auth } from './FirebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useGetDailyCalories } from './hooks/useGetDailyCalories.js';
import { useGetUserInfo} from './hooks/useGetUserInfo.js';


function App() {

  // const { dailyCalories } = useGetDailyCalories();
  // const { userID } = useGetUserInfo()

  
  // const totalCalories = dailyCalories.find(obj => {return obj.userId == userID})

//   const test = dailyCalories.map(dc => {
//     return[dc.calories, dc.userId, dc.id]
//   });

//   const [a, b, c] = test;
// useEffect(()=> {
//   if(a){
//   const dailyCaloriesInfo = {
//     calories: a[0],
//     userID: a[1],
//     id: a[2],
//   }
//   localStorage.setItem("testCalStorage", JSON.stringify(dailyCaloriesInfo));
// };
// })
  
  // const [data, setData] = useState([]);
  // const [userId, setUserId] = useState("");
  
  // onAuthStateChanged(fb_auth, (user) => {
  //  if(user){
  //    setUserId(user.uid);
  //  }
  // });

  // useEffect(() =>{
  //   if(fb_auth.currentUser){
  //     setUserId(fb_auth.currentUser.uid);
  //   }
  // },[fb_auth.currentUser])
  
  // FirebaseDataHandler(setData);
  

// console.log(data);

  // const userCurrentCalories = data.filter((meal) => meal.isChecked).reduce((acc, o) => acc + parseInt(o.calories), 0);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children:[
        { path: '/',  element: <HomePage />},
        { path: '/PersonalMenu',  element: <Protected><PersonalMenu /></Protected>},
        // { path: '/PersonalMenu',  element: <Protected><PersonalMenu UserTotalCalories={UserTotalCalories}/></Protected>},
        { path: '/Auth',  element: <Auth />},
        { path: '/Profile', element: <Protected><Profile/></Protected>}
      ],
    },
  
  ]);

  return (
    <>    <AuthContext>
      <RouterProvider router={router}/>
    </AuthContext>
    </>
  );
}

export default App
