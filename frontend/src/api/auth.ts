import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/",
//   withCredentials: true, 
// });

// export default api;
axios.defaults.withCredentials = true;


function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

const csrfToken = getCookie("csrftoken");
console.log(csrfToken);


const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,

});
export default api;
