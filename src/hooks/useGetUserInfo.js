export const useGetUserInfo = () => {
    const {userEmail, userID, isAuth, dailyCalories} = JSON.parse(
        localStorage.getItem("auth"));
    return{userEmail, userID, isAuth, dailyCalories}
}

export const useGetUserCaloriesInfo = () => {
    const {calories, userID, id} = JSON.parse(
        localStorage.getItem("testCalStorage")
    );
    return {calories, userID, id};
}