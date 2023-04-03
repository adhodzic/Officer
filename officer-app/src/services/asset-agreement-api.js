import axios from './axiosWithAuth'

const get = async function(){
    const res = await axios.get('/asset-agreement')
    return res
}

const create = async function(data){
    const res = await axios.post('/asset-agreement',data)
    console.log(res.data)
}

const remove = async function(data){
    const res = await axios.delete('/asset-agreement',{data: {data}})
    console.log(res.data)
}

export default {
    get,
    create,
    remove
}