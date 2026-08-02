import api from "./api";

export async function getNutritionScore() {

    const response = await api.get("/score/today");

    return response.data;

}