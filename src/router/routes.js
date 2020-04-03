export default [
    {
        path: '/',
        name: '首页',
        component: () => import('@/views/index')
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import('@/views/articles')
    },
    {
        path: '/tags',
        name: '标签',
        component: () => import('@/views/tags')
    },
    {
        path: '/categories',
        name: '分类',
        component: () => import('@/views/categories')
    }
]