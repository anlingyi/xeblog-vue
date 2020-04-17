import request from '@/plugin/axios'

// 菜单列表
export function listMenu() {
    return request({
        url: 'menu',
        method: 'get'
    })
}