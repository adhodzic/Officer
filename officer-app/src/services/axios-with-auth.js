import axios, { AxiosError } from 'axios'
function getToken(){
    return JSON.parse(localStorage.getItem('user'))?.Token
}

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
})

instance.interceptors.request.use(function (config) {
    let token = getToken()
    if(!token){
      console.log("Token is unavaliable or invalid")
      window.location.href = window.location.origin + '/login'
    }
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    console.log(error)
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if(error.response?.status == 401){
      window.location.href = window.location.origin + '/login'
    }
    return Promise.reject(error);
  });
export default  instance