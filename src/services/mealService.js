import api from "./api";

export async function logMeal(
    menuItemId,
    mealType = "Lunch",
    quantity = 1
) {

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

    /*
     * NutritionOS state has changed successfully.
     *
     * Dashboard listens for this event and refreshes:
     * - dashboard metrics
     * - nutrition score
     * - calories chart
     * - today's meals
     * - recommendation state
     */
    window.dispatchEvent(
        new CustomEvent("nutrition-state-updated")
    );

    return response.data;
}