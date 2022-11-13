import axios from "axios";
import jwtDecode from "jwt-decode" ;

const baseUrl = "http://127.0.0.1:8000";

export const axiosInstance = axios.create({
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }
})

// {
  // baseURL: baseUrl,
  // timeout: 1000,
  // headers: {'Content-Type': 'application/x-www-form-urlencoded',}
// }

const tokenKey = 'accessToken'

const getToken = () => {
  console.log('axios getToken is running')
    return localStorage.getItem(tokenKey)
}

const setToken = (token) => {
    localStorage.setItem(tokenKey, token)
}

const isTokenExpired = () => {
    const decoded = jwtDecode(getToken())
    console.log('decoding', decoded)
    return decoded.exp > Date.now()
}

const getRefreshedToken = () => {
  const ref = localStorage.getItem('refreshToken')
    return axiosInstance.post('/api/token/refresh/', {'refresh': ref})
}

const refreshToken = async () => {
  const newToken = await getRefreshedToken()
  console.log('refreshtokennn', newToken)
  setToken(newToken.access)
}

axiosInstance.interceptors.request.use(async (config) => {
    if(isTokenExpired()){
        await refreshToken()
        config.headers.Authorization = `Bearer ${getToken()}`
        console.log('req from interceptor', config)
        return config
    }

    

    const token = getToken()
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log(`Bearer ${token}`)
    console.log(token)
    config.headers.Authorization = `Bearer ${token}`
    const expired = isTokenExpired()
    
    return config
})













// const axiosApiInstance = axios.create();

// // Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//   async config => {
//     const access = localStorage.getItem("accessToken")
//     const tokenParts = JSON.parse(window.atob(access.split(".")[1]))
//     const now = Math.ceil(Date.now() / 1000);

//     localStorage.getItem("accessToken")
    
//     if (tokenParts < now) {
//       axios.post("http://127.0.0.1:8000/api/token/refresh", )
//     }

//     config.headers = {
//       'Authorization': `Bearer ${access}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error)
// });

// // Response interceptor for API calls
// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const access_token = await refreshAccessToken();            
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });

