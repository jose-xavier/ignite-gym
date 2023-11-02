import { AppError } from '@utils/AppError'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.200.96:3333'
})

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response?.data.message))
    } else {
        return Promise.reject(new AppError('Erro no servidor tente novamente mais tarde'))
    }
})

export { api }