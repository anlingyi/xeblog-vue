import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    let websiteInfo = Vue.prototype.$websiteInfo
    if (!websiteInfo) {
        websiteInfo = {
            title: 'title',
            subtitle: 'subtitle'
        }
    }
    document.title = (to.meta.title || 'xeblog') + ' | ' + websiteInfo.title + '-' + websiteInfo.subtitle
    next()
})

export default router

