import axios from "axios";
import { showError } from "../components/common/AppToast";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 30000,
});

// ==============================
// Attach JWT Token
// ==============================

api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("access_token");

    if (token) {

      config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

  },

  (error) => Promise.reject(error)

);

// ==============================
// Global Error Handling
// ==============================

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (!error.response) {

      showError("Unable to connect to server.");

      return Promise.reject(error);

    }

    switch (error.response.status) {

      case 401:

        localStorage.removeItem("access_token");

        showError("Session expired. Please login again.");

        setTimeout(() => {

          window.location.href = "/login";

        }, 1200);

        break;

      case 403:

        showError("You are not authorized.");

        break;

      case 404:

        showError("Requested resource not found.");

        break;

      case 500:

        showError("Internal Server Error.");

        break;

      default:

        showError(

          error.response.data?.detail ||

          "Something went wrong."

        );

    }

    return Promise.reject(error);

  }

);

export default api;