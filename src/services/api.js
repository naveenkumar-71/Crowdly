import { refreshAccessToken } from "./auth";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export const apiFetch = async (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };
  

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        headers.Authorization = `Bearer ${token}`;
        return fetch(url, { ...options, headers });
      }).catch(err => Promise.reject(err));
    }

    isRefreshing = true;
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const result = await refreshAccessToken(refreshToken);
      const newAccessToken = result.accessToken;

      localStorage.setItem("accessToken", newAccessToken);
      if (result.newRefreshToken) {
        localStorage.setItem("refreshToken", result.newRefreshToken);
      }

      headers.Authorization = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);

      return fetch(url, { ...options, headers });
    } catch (error) {
      processQueue(error, null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
      return Promise.reject(new Error("Session expired. Please log in again."));
    } finally {
      isRefreshing = false;
    }
  }

  return response;
};
