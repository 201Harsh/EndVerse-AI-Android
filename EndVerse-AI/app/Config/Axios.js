import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://endverse-ai-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
