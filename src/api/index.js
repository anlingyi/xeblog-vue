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

// 分类列表
export function categoryList() {
    return request({
        url: 'categories',
        method: 'get',
    })
}

// 标签列表
export function tagList() {
    return request({
        url: 'tags',
        method: 'get',
    })
}

// 文章详情
export function articleInfo(id) {
    return request({
        url: 'articles/' + id,
        method: 'get',
    })
}

// 发送验证码
export function sendVerifyCode(data) {
    return request({
        url: 'subscribe/sendVerifyCode',
        method: 'get',
        params: {
            email: data
        }
    })
}

// 订阅
export function subscribe(data) {
    return request({
        url: 'subscribe',
        method: 'post',
        params: data
    })
}

// 归档
export function archives(data) {
    return request({
        url: 'articles/archives',
        method: 'get',
        params: data
    })
}