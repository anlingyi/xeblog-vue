<template>
    <div class="sidebar">
        <div class="sidebar-main">
            <div class="user-info">
                <div class="menu-btn" ref="menuBtn">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div class="avatar" @click="backTop">
                    <img :src="userInfo.avatar">
                </div>
                <div class="username">
                    {{ userInfo.name }}
                </div>
                <transition name="fade">
                    <div class="signature" v-show="showMenu">
                        {{ userInfo.signature }}
                    </div>
                </transition>
                <div class="statistics">
                    <ul>
                        <li>
                            <div class="val">{{ userInfo.articleCount }}</div>
                            <div>日志</div>
                        </li>
                        <li>
                            <div class="val">{{ userInfo.categoryCount }}</div>
                            <div>分类</div>
                        </li>
                        <li>
                            <div class="val">{{ userInfo.tagCount }}</div>
                            <div>标签</div>
                        </li>
                    </ul>
                </div>
            </div>
            <transition name="fade">
                <div class="menu" v-show="showMenu">
                    <hr/>
                    <ul>
                        <li @click="to(menu.url)" v-for="menu in menuList" :key="menu.id"
                            :class="getSelectedCss(menu.url)">
                            <i :class="'fa fa-' + menu.icon"></i> {{ menu.name }}
                        </li>
                        <li @click="subscribe()"><i class="fa fa-feed"></i> 订阅</li>
                    </ul>
                    <div class="search-body">
                        <input type="text" placeholder="搜索..." v-model="query"/>&nbsp;
                        <i class="fa fa-search search-btn" title="点击搜索" @click="search()"></i>
                    </div>
                </div>
            </transition>
        </div>
        <XeSubscription ref="subscribe"/>
    </div>
</template>

<script>
    import XeSubscription from '../xe-subscription'
    import * as api from '@/api'

    export default {
        data() {
            return {
                showMenu: false,
                menuList: [],
                userInfo: {
                    avatar: '',
                    name: '',
                    signature: '',
                    articleCount: 0,
                    categoryCount: 0,
                    tagCount: 0
                },
                query: ''
            }
        },
        components: {
            XeSubscription
        },
        mounted() {
            this.bindDisplayMenu()
            this.init()
            this.getUserInfo()
        },
        methods: {
            displayMenu() {
                this.showMenu = !this.showMenu
            },
            hideMenu() {
                if (this.showMenu) {
                    this.showMenu = false
                }
            },
            bindDisplayMenu() {
                if (document.body.clientWidth < 950) {
                    this.$refs.menuBtn.onclick = this.displayMenu
                    this.$parent.$refs.main.onclick = this.hideMenu
                } else {
                    this.showMenu = true
                }
            },
            backTop() {
                let scrollTop = document.documentElement.scrollTop
                if (scrollTop === 0) {
                    return;
                }
                let offset = Math.floor(scrollTop / 5)
                if (offset === 0) {
                    offset = scrollTop
                }
                document.documentElement.scrollTop = scrollTop - offset
                setTimeout(this.backTop, 15)
            },
            subscribe() {
                this.$refs.subscribe.open()
            },
            to(url) {
                if (url.startsWith('http')) {
                    window.open(url, '_blank')
                    return
                }

                this.$router.push({
                    path: url
                })
            },
            init() {
                api.listMenu().then((resp) => {
                    this.menuList = resp.data
                })
            },
            getUserInfo() {
                api.userInfo().then((resp) => {
                    this.userInfo = resp.data
                })
            },
            getSelectedCss(url) {
                if (this.$route.path === url) {
                    return 'selectedMenu'
                }

                return ''
            },
            search() {
                if (this.query.trim() === '') {
                    return
                }

                this.$router.push({
                    path: '/',
                    query: {
                        query: this.query
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>