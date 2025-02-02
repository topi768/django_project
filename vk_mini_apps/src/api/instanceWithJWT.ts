import axios from "axios";

export const instanceWithJWT = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 10000,
  // headers: {
  //   authorization: `Bearer ${}`,
  // },
});

// Добавляем интерсептор для включения токена из localStorage
instanceWithJWT.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // Берём токен из localStorage
  
  if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Включаем токен в заголовок Authorization
  }
  return config;
});

