import apiClient from "./apiClient";

interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  message?: string;
}

export const callApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  params?: Record<string, any>
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.request<T>({
      url: endpoint,
      method,
      data,
      params,
    });
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    console.error(`API Error (${method} ${endpoint}):`, error.message);
    return {
      data: null,
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
