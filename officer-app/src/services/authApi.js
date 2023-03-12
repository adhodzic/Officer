import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:5000/api'
})

const login = async function(Username, Password){
    return await instance.post('/login',{
        Username,
        Password
    })
}

const register = async function(Username, Password, FullName){
    return await instance.post('/register',{
        Username,
        Password,
        FullName
    })
}

export default {
    login,
    register
}