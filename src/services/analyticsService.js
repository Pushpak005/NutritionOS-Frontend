import api from "./api";

export async function getWeeklyAnalytics() {

    const response = await api.get("/analytics/weekly");

    return response.data;

}