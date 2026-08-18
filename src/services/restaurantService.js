import api from "./api";

// ==============================
// Restaurants
// ==============================

export async function getRestaurants() {

    const response = await api.get("/restaurants");

    return response.data;

}

// ==============================
// Restaurant Menu
// ==============================

export async function getRestaurantMenu(id) {

    const response = await api.get(

        `/restaurants/${id}/menu`

    );

    return response.data;

}

// ==============================
// AI Recommendations
// Restaurant Details
// ==============================

export async function getRestaurantDetails(id) {

    const response = await api.get(

        `/restaurant/${id}`

    );
    return response.data;

}