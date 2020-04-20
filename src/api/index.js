import request from '@/plugin/axios'

// 菜单列表
export function listMenu() {
    return request({
        url: 'menu',
        method: 'get'
    })
}

// 用户信息
export function userInfo() {
    return request({
        url: 'user_info',
        method: 'get'
    })
}

// 网站信息
export function websiteInfo() {
    return request({
        url: 'website_info',
        method: 'get'
    })
}

// 文章列表
export function articleList(data) {
    return request({
        url: 'articles',
        method: 'get',
        params: data
    })
}