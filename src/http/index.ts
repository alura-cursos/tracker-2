import axios, { AxiosInstance } from 'axios'

const clientHttp: AxiosInstance = axios.create({
    baseURL: "http://localhost:4000/"
})

export default clientHttp;