import axios from "axios";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 10000,
  // headers: {
  //   authorization: `Bearer ${window.location.search?.replace("?", "") || ""}`,
  // },
});



