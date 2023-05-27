const get = async function(name){
    const res = await axios.get('/application-settings',{ params: { name: name } })
    return res.data
}

export default {
    get
}