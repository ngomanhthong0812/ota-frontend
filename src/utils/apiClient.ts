import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { parseCookies } from "nookies"; // Lấy từ nookies

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor cho request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Lấy cookies ở client-side
    const cookies = parseCookies();
    const token = cookies.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Token expired or invalid.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
