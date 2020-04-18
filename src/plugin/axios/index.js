import axios from 'axios'
import vue from 'vue'

const api_url = process.env.VUE_APP_API_URL

const service = axios.create({
    baseURL: api_url,
    timeout: 5000
})

// 响应拦截器
service.interceptors.response.use((resp) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(resp)
    }

    if (resp.data.code === 200) {
        // 请求成功
        return resp.data
    }
}, (error) => {
    // 请求失败
    vue.prototype.$toast.error('网络错误！')
})

export default service