import api from "./api";

export async function calculateNutrition() {

    const response = await api.post("/nutrition/calculate");

    return response.data;

}