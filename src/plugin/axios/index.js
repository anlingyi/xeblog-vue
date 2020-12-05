import axios from 'axios'
import vue from 'vue'

const api_url = process.env.VUE_APP_API_URL
const debug = process.env.VUE_APP_DEBUG

const service = axios.create({
    baseURL: api_url,
    timeout: 30000
})

function addLog(log) {
    if (debug === 'true') {
        console.log(log)
    }
}

// 响应拦截器
service.interceptors.response.use((resp) => {
    addLog(resp)
    // 请求成功
    return resp.data
}, (error) => {
    vue.prototype.$toast.error('网络错误！')
    return Promise.reject(error)
})

export default service