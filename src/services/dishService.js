import api from "./api";

export async function getDish(dishId) {

    const response = await api.get(

        `/dish/${dishId}`

    );

    return response.data;

}