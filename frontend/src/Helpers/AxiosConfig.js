import axios from 'axios'

const tokenKey = localStorage.getItem('tokenKey') ? localStorage.tokenKey : ''

const AxiosConfig = axios.create({
    baseURL: 'http://192.168.4.4:8009/',
    headers: {
        authorization: `bearer ${tokenKey}`,
        Coder: 'Yassinos-Coder'
    }
})

export default AxiosConfig