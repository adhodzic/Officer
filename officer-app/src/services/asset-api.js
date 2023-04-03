import axios from './axios-with-auth'

const get = async function(){
    const res = await axios.get('/asset')
    return res
}

const create = async function(data){
    const res = await axios.post('/asset',data)
    console.log(res.data)
}

const remove = async function(data){
    const res = await axios.delete('/asset',{data: {data}})
    console.log(res.data)
}

export default {
    get,
    create,
    remove
}