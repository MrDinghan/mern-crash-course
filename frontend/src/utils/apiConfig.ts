import axios from "axios";

import { OpenAPI } from "@/api/core/OpenAPI";

export const initializeApi = () => {
  OpenAPI.HEADERS = {
    "Content-Type": "application/json",
  };
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      console.log("✅ Response:", response);
      return response;
    },
    (error) => {
      console.error("❌ Response Error:", error);
      return Promise.reject(error);
    }
  );
};
