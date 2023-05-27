import axios, { AxiosError } from 'axios'
function getToken(){
    return JSON.parse(localStorage.getItem('token'))
}

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
})

instance.interceptors.request.use(function (config) {
    let token = getToken()
    if(!token){
      console.log("Token is unavaliable or invalid");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = window.location.origin + '/login'
    }
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    console.log(error)
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response?.status == 401){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = window.location.origin + '/login'
    }
    return Promise.reject(error);
  });
export default  instance