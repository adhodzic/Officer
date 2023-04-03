import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:5000/api'
})

const login = async function(Username, Password){
    return await instance.get('/login',{
        params: {
            Username,
            Password
        }
    })
}

const register = async function(Username, Password, Email){
    return await instance.post('/register',{
        Username,
        Password,
        Email
    })
}

export default {
    login,
    register
}