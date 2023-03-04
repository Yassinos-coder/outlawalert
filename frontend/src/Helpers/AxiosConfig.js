import axios from 'axios'

const token = localStorage.getItem('tokenKey') ? localStorage.tokenKey : ""

const AxiosConfig = axios.create({
    baseURL: 'http://localhost:8009/',
    headers: {
        authorization: `bearer ${token}`
    }
})

export default AxiosConfig