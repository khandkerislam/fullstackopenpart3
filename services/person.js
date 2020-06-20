import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    const result = request.then(response => {
        return response.data})
    return result
}

const update = (id,newObject) => {
    const url = `${baseUrl}/${id}`;
    const request = axios.put(url, newObject);
    return request.then(res => {
return res.data});
};

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}


export default {getAll, create, update, remove}