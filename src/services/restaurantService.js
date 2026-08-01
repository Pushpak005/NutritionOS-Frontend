import api from "./api";

export async function getRestaurants() {
  const response = await api.get("/restaurants");
  return response.data;
}

export async function getRestaurantMenu(id) {
  const response = await api.get(`/restaurants/${id}/menu`);
  return response.data;
}