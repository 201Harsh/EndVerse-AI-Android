// axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://endverse-ai-backend.onrender.com",
});

// 🔐 Attach token dynamically before every request
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token"); // Always fresh
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;