import axios from 'axios'

const AxiosConfig = axios.create({
    baseURL: 'http://192.168.3.194:8009/',
})

AxiosConfig.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('tokenKey')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default AxiosConfig
