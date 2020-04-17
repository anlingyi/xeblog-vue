<template>
    <div class="sidebar">
        <div class="sidebar-main">
            <div class="user-info">
                <div class="menu-btn" ref="menuBtn">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div class="avatar" @click="backTop">
                    <img src="https://oss.xeblog.cn/prod/2303fbd79a504111b223e0d8e81d7ccd.jpg">
                </div>
                <div class="username">
                    AnLingYi
                </div>
                <transition name="fade">
                    <div class="signature" v-show="showMenu">
                        穷且益坚，不坠青云之志。
                    </div>
                </transition>
                <div class="statistics">
                    <ul>
                        <li>
                            <div class="val">99</div>
                            <div>日志</div>
                        </li>
                        <li>
                            <div class="val">99</div>
                            <div>分类</div>
                        </li>
                        <li>
                            <div class="val">99</div>
                            <div>标签</div>
                        </li>
                    </ul>
                </div>
            </div>
            <transition name="fade">
                <div class="menu" v-show="showMenu">
                    <hr/>
                    <ul>
                        <li @click="to('/')"><i class="fa fa-home"></i> 首页</li>
                        <li @click="to('/categories')"><i class="fa fa-archive"></i> 分类</li>
                        <li @click="to('/tags')"><i class="fa fa-tags"></i> 标签</li>
                        <li @click="to('https://xeblog.cn')"><i class="fa fa-user-secret"></i> 关于</li>
                        <li @click="subscribe()"><i class="fa fa-feed"></i> 订阅</li>
                    </ul>
                    <div class="search-body">
                        <input type="text" placeholder="搜索..."/>&nbsp;
                        <i class="fa fa-search search-btn" title="点击搜索"></i>
                    </div>
                </div>
            </transition>
        </div>
        <XeSubscription ref="subscribe"/>
    </div>
</template>

<script>
    import XeSubscription from '../xe-subscription'
    export default {
        data() {
            return {
                showMenu: false
            }
        },
        components: {
            XeSubscription
        },
        mounted() {
            this.bindDisplayMenu()
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
            }
        }
    }
</script>

<style scoped>
</style>