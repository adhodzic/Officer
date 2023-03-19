import axios from 'axios'
function getToken(){
    return JSON.parse(localStorage.getItem('user'))?.Token
}

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
})

instance.interceptors.request.use(function (config) {
    let token = getToken()
    if(!token) throw new Error("Token is not avaliable");
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
export default  instance