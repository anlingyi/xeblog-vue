export default [
    {
        path: '/',
        name: 'index',
        query: {
            tagId: '',
            tagName: '',
            categoryId: '',
            categoryName: '',
            query: ''
        },
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
        path: '/archives',
        name: 'archives',
        meta: {
            title: '归档'
        },
        component: () => import('@/views/archives')
    },
    {
        path: '/footprint',
        name: 'footprint',
        meta: {
            title: '足迹'
        },
        component: () => import('@/views/footprint')
    },
    {
        path: '*',
        component: () => import('@/views/error/404')
    }
]