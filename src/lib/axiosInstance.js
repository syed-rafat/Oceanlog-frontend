import axios from "axios";
import jwtDecode from "jwt-decode";

const baseUrl = "http://127.0.0.1:8000";

export const axiosInstance = axios.create({
  headers: {
    // Overwrite Axios's automatically set Content-Type
    "Content-Type": "application/json",
  },
});

// {
// baseURL: baseUrl,
// timeout: 1000,
// headers: {'Content-Type': 'application/x-www-form-urlencoded',}
// }

const tokenKey = "accessToken";

const getToken = () => {
  console.log("axios getToken is running");
  return localStorage.getItem(tokenKey);
};

const setToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

const isTokenExpired = () => {
  const decoded = jwtDecode(getToken());
  console.log("decoding", decoded.exp);
  console.log('Date.now', Date.now()/1000)
  return decoded.exp < Date.now()/1000;
};

const getRefreshedToken = () => {
  const ref = localStorage.getItem("refreshToken");
  return axiosInstance.post("/api/token/refresh/", { refresh: ref });
};

const refreshToken = async () => {
  const newToken = await getRefreshedToken();
  console.log("refreshtokennn", newToken);
  localstorage.setItem("accessToken", newToken.data.access);
};

axiosInstance.interceptors.request.use(async (config) => {
  if (isTokenExpired()) {
    const ref = localStorage.getItem("refreshToken");
    console.log('refreshing token')
    const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => localStorage.setItem("accessToken", res.access))
      .then((res) => (config.headers.Authorization = `Bearer ${getToken()}`));
    // config.headers.Authorization = `Bearer ${getToken()}`
    console.log("req from interceptor", config);
    return config;
  }

  const token = getToken();
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(`Bearer ${token}`);
  console.log(token);
  config.headers.Authorization = `Bearer ${token}`;
  const expired = isTokenExpired();
  console.log("EXPIRED?", expired);

  return config;
});