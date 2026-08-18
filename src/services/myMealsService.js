import api from "./api";


// ==========================================
// My Meals
// ==========================================

export async function getMyMeals() {

    const response = await api.get(
        "/my-meals"
    );

    return response.data;

}


// ==========================================
// Today's Meal Logs
// ==========================================

export async function getTodaysMeals() {

    const response = await api.get(
        "/meal-log/today"
    );

    return response.data;

}