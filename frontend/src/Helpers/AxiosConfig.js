import axios from 'axios'

const AxiosConfig = axios.create({
    baseURL: 'http://143-42-109-152.ip.linodeusercontent.com/',
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
