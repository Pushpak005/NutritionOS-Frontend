import api from "./api";

export async function logMeal(menuItemId, mealType = "Lunch", quantity = 1) {

    const response = await api.post(
        "/meals/log",
        null,
        {
            params: {
                menu_item_id: menuItemId,
                meal_type: mealType,
                quantity: quantity
            }
        }
    );

    return response.data;

}