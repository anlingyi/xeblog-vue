export default [
    {
        path: '/',
        name: 'index',
        meta: {
            title: '首页'
        },
        component: () => import('@/views/index')
    },
    {
        path: '/articles/:id',
        component: () => import('@/views/articles')
    },
    {
        path: '/tags',
        name: 'tags',
        meta: {
            title: '标签'
        },
        component: () => import('@/views/tags')
    },
    {
        path: '/categories',
        name: 'categories',
        meta: {
            title: '分类'
        },
        component: () => import('@/views/categories')
    },
    {
        path: '*',
        component: () => import('@/views/error/404')
    }
]