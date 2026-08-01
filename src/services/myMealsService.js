import api from "./api";

export async function getMyMeals() {

    const response = await api.get("/my-meals");

    return response.data;

}