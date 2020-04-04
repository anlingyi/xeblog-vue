import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/components'
import 'font-awesome/css/font-awesome.min.css'
import Toast from './components/xe-toast'

Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
    router
}).$mount('#app')
