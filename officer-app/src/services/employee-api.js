import axios from './axios-with-auth'

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const get = async function(){
    const res = await axios.get('/employee')
    return res
}

const create = async function(data){
    // const ActivationCode = uuidv4()
    const res = await axios.post('/employee',{...data})
    console.log(res.data)
}

const remove = async function(data){
    const res = await axios.delete('/employee',{data: {data}})
    console.log(res.data)
}

export default {
    get,
    create,
    remove
}