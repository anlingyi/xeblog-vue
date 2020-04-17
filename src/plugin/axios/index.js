import axios from "axios"

const api_url = process.env.VUE_APP_API_URL

const service = axios.create({
    baseURL: api_url,
    timeout: 5000
})

// 响应拦截器
service.interceptors.response.use((resp) => {
    if (resp.data.code === 200) {
        // 请求成功
        return resp.data
    }
}, (error) => {
    // 请求失败
})

export default service