<template>
    <xe-container>
        <div class="articles">
            <div class="article" v-for="item in items" :key="item">
                <h2 class="article-title">
                    Java从入门到入土{{ item }}
                </h2>
                <div class="article-mark">
                    <i class="fa fa-calendar-o"></i>&nbsp;<span class="article-send-time">2020/03/24</span>&nbsp;|
                    <i class="fa fa-leaf"></i>&nbsp;<span class="article-category"><a href="#">记录</a></span>&nbsp;|
                    <i class="fa fa-eye"></i>&nbsp;<span class="article-read-count">999</span>
                </div>
                <div class="article-info">
                    金佛二氨基过热JFK大家反馈的健身卡附近的绿卡弗兰克大家看附件打开啦骄傲风口浪尖的十六客服经理卡就发立刻决定离开积分卡
                    放你离开大幅利空打击连卡佛利空打击啊立刻就过分了啊空间广阔的垃圾拉开距离大口径
                </div>
                <div class="article-info-image">
                    <img src="https://oss.xeblog.cn/prod/50fbe9e7f1a04295a67aa12542242d1c.png">
                </div>
            </div>
        </div>
        <xe-pagination pageIndex="1" pages="5"/>
    </xe-container>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    0, 1, 2, 3, 4, 5
                ]
            }
        }
    }
</script>

<style scoped>
</style>