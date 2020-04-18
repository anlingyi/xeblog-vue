import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/components'
import 'font-awesome/css/font-awesome.min.css'
import Toast from './components/xe-toast'
import {websiteInfo} from '@/api'

Vue.use(Toast)

Vue.config.productionTip = false

websiteInfo().then((resp) => {
    Vue.prototype.$websiteInfo = resp.data
}).finally(() => {
    new Vue({
        render: h => h(App),
    router
    }).$mount('#app')
})

