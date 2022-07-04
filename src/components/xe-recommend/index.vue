<template>
    <div class="recommend">
        <div class="title"><i class="fa fa-heart" style="color: #9d2933"></i>（不）推荐阅读 <i class="fa fa-heart"
                                                                                        style="color: #9d2933"></i>
        </div>
        <div class="article-list">
            <ul v-for="article in articleList" :key="article.id">
                <li><a :href="getRootUrl() + '/articles/' + article.id">{{ article.title }}</a></li>
            </ul>
        </div>
        <div class="reason">
            （不）推荐理由😊： {{ this.getReason() }}
        </div>
    </div>
</template>

<script>
import * as api from '@/api'

export default {
    data() {
        return {
            articleList: [],
            reasonList: [
                "写的挺好的，下次别写了！",
                "我家的🐶自学3小时写出来的都比这好！",
                "往键盘上撒把米，让我家的🐔琢出来都比这好！",
                "求你别写了，找个厂子养老去吧！",
                "呸~ 🐶都不看！",
                "亲~ 这边建议您把博客关了呢！",
                "评论都是刷的，大家别信！"
            ]
        }
    },
    methods: {
        listRecommend() {
            api.getRecommendList().then(resp => {
                let list = resp.data
                let len = list.length
                if (len < 0) {
                    return
                }

                let index, temp
                while (len > 0) {
                    index = Math.floor(Math.random() * len)
                    temp = list[len - 1]
                    list[len - 1] = list[index]
                    list[index] = temp
                    len--
                }

                this.articleList = list.slice(0, Math.min(list.length, 5))
            })
        },
        getRootUrl() {
            return window.location.protocol + "//" + window.location.host
        },
        getReason() {
            return this.reasonList[Math.floor(Math.random() * this.reasonList.length)]
        }
    },
    mounted() {
        this.listRecommend();
    }
}
</script>

<style lang="less" scoped>
.recommend {
    border: 1px solid #edd1d8;
    border-radius: 5px;
    background-color: #edd1d8;
    box-shadow: 0px 0px 5px 0px #edd1d8;
    margin: 15px auto;
    padding: 0 10px;
    color: #9d2933;

    .title {
        text-align: center;
        margin-top: 5px;
        font-weight: bold;
        font-size: 16px;
    }

    .article-list {
        font-size: 16px;

        a {
            color: #b35256;

            &:hover {
                color: #9d2933;
            }
        }
    }

    .reason {
        text-align: right;
        font-size: 15px;
        margin-bottom: 8px;
    }
}
</style>