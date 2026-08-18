import api from "./api";

// ========================================
// AI Meal Recommendations
// ========================================

export async function getRecommendations({

    goal,

    diet,

    budget

}) {

    const response = await api.post(

        "/recommend",

        {

            goal,

            diet,

            budget

        }

    );

    return response.data;

}

// ========================================
// Recommendation Details
// ========================================

export async function getRecommendationDetails(id) {

    const response = await api.get(

        `/recommendations/${id}`

    );

    return response.data;

}