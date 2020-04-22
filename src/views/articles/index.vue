<template>
    <xe-container ref="xeContainer">
        <div class="posts">
            <h2 class="article-title" v-text="articleInfo.title">
            </h2>
            <div class="article-mark">
                <i class="fa fa-calendar-o"></i>&nbsp;<span class="article-send-time"
                                                            v-text="articleInfo.createTime"></span>&nbsp;|
                <i class="fa fa-leaf"></i>&nbsp;<span class="article-category">
                <a :href="'/?categoryId=' + articleInfo.categoryId + '&categoryName=' + articleInfo.categoryName"
                   v-text="articleInfo.categoryName"></a>
                </span>&nbsp;| <i class="fa fa-eye"></i>&nbsp;<span class="article-read-count"
                                                                    v-text="articleInfo.pageviews"></span>
            </div>
            <div class="article-info markdown-body" v-html="articleInfo.content">
            </div>
            <div class="subscribe">
                <button @click="() => {this.$refs.xeContainer.subscribe()}"><i class="fa fa-feed"></i> 订阅博主</button>
            </div>
            <div class="tags">
                <a :href="'/?tag=' + tag" v-for="tag in articleInfo.tags" :key="tag"><span><i class="fa fa-tag"></i>&nbsp;{{ tag }}</span></a>
            </div>
            <div class="share">
                <i>“ 爱分享的人，运气不会太差！” — 沃·兹基硕德</i>
                <div class="social-share" :data-sites="sites"></div>
            </div>
            <div class="copyright">
                <ul class="post-copyright">
                    <li class="post-copyright-author">
                        <strong>更新时间：</strong>
                        <span v-text="articleInfo.updateTime"></span>
                    </li>
                    <li class="post-copyright-author">
                        <strong>本文作者：</strong>
                        <span v-text="articleInfo.author"></span>
                    </li>
                    <li class="post-copyright-link">
                        <strong>本文链接：</strong>
                        <a href="#" target="_blank">{{ this.$route.path }}</a>
                    </li>
                    <li class="post-copyright-license">
                        <strong>版权声明：</strong>
                        <span>本文章内容纯属作者个人观点，仅供参考，如需转载，请注明出处！</span>
                    </li>
                </ul>
            </div>
            <div class="nav">
                <div class="previous">
                    <a :href="previous.id ? '/articles/' + previous.id : 'javascript:;'"><i
                            class="fa fa-chevron-left"></i>{{ previous.title ? previous.title : '没有了' }}</a>
                </div>
                <div class="next">
                    <a :href="next.id ? '/articles/' + next.id : 'javascript:;'">{{ next.title ? next.title : '没有了' }}<i
                            class="fa fa-chevron-right"></i></a>
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>
    </xe-container>
</template>

<script>
    import '@/assets/lib/social-share/js/social-share.min.js'
    import * as api from '@/api'
    import MarkDownIt from 'markdown-it'

    export default {
        data() {
            return {
                sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban', 'facebook', 'twitter'],
                articleInfo: {
                    id: '',
                    title: '',
                    categoryName: '',
                    tags: [],
                    pageviews: '',
                    author: '',
                    content: '',
                    createTime: '',
                    updateTime: '',
                    categoryId: '',
                    cover: '',
                    brief: ''
                },
                previous: {
                    id: '',
                    title: ''
                },
                next: {
                    id: '',
                    title: ''
                }
            }
        },
        mounted() {
            this.getArticleInfo()
        },
        methods: {
            getArticleInfo() {
                api.articleInfo(this.$route.params.id).then(resp => {
                    const data = resp.data
                    if (!data || !data.articleDetailsDTO) {
                        this.$router.push({
                            path: '/404'
                        })
                        return
                    }

                    const articleData = data.articleDetailsDTO

                    this.articleInfo = {
                        id: articleData.id,
                        title: articleData.title,
                        categoryName: articleData.categoryName,
                        tags: articleData.tag ? articleData.tag.split(',') : [],
                        pageviews: articleData.pageviews,
                        author: articleData.author,
                        content: new MarkDownIt({html: true}).render(articleData.content),
                        createTime: articleData.createTime,
                        updateTime: articleData.updateTime,
                        categoryId: articleData.categoryId,
                        cover: articleData.cover,
                        brief: articleData.brief
                    }

                    if (data.previous) {
                        this.previous = data.previous
                    }
                    if (data.next) {
                        this.next = data.next
                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import '../../assets/lib/social-share/css/share.min.css';
    @import '../../assets/lib/markdown-theme/GitHub.css';
</style>