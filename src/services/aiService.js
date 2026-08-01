import api from "./api";

export async function getRecommendations() {

    const response = await api.get("/ai/recommend");

    return response.data;

}