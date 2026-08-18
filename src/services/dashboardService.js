import api from "./api";

export async function getDashboard() {

    const response = await api.get("/dashboard");

    console.log("AXIOS RESPONSE");
    console.log(response);
    console.log("AXIOS DATA");
    console.log(response.data);

    return response.data;
    
}