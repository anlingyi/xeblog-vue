<template>
    <xe-container>
        <div class="queryData">
            <div v-if="tagName !== ''">
                <span>标签：</span><span class="tag">{{ this.tagName }}</span>
            </div>
            <div v-if="categoryName !== ''">
                <span>分类：</span><span class="category">{{ this.categoryName }}</span>
            </div>
            <div v-if="queryData.query !== ''">
                <span>关键词：</span> <span class="keyword">" {{ this.queryData.query }} "</span>
            </div>
        </div>
        <div class="articles">
            <div class="article" v-for="article in articleList" :key="article.id">
                <h2 class="article-title">
                    <a :href="'/articles/' + article.id" v-text="article.title"></a>
                </h2>
                <div class="article-mark">
                    <i class="fa fa-calendar-o"></i> <span class="article-send-time" v-text="article.createTime"></span>&nbsp;|
                    <i class="fa fa-leaf"></i> <span class="article-category">
                    <a href="javascript:void(0)" @click="queryDataByCategory(article.categoryId, article.categoryName)"
                       v-text="article.categoryName"></a>
                    </span>&nbsp;| <i class="fa fa-eye"></i>&nbsp;<span class="article-read-count"
                                                                        v-text="article.pageviews"></span>
                </div>
                <div class="article-info" v-text="article.brief">
                </div>
                <div class="article-info-image" v-if="article.cover !== ''">
                    <img :src="article.cover">
                </div>
            </div>
        </div>
        <xe-pagination :pageIndex="queryData.pageIndex" :pageSize="pages" @pageIndexChange="pageIndexChange"
                       v-if="isPageShow && pages > 0"/>
    </xe-container>
</template>

<script>
    import * as api from '@/api'

    export default {
        data() {
            return {
                articleList: [],
                pages: 0,
                tagName: this.$route.query.tagName || '',
                categoryName: this.$route.query.categoryName || '',
                queryData: {
                    pageIndex: 1,
                    pageSize: 10,
                    query: this.$route.query.query || '',
                    tag: this.$route.query.tagId || '',
                    categoryId: this.$route.query.categoryId || ''
                },
                isPageShow: false
            }
        },
        mounted() {
            this.getArticleList()
        },
        methods: {
            getArticleList() {
                this.isPageShow = false
                api.articleList(this.queryData).then(resp => {
                    const data = resp.data
                    if (!data.list || data.list.length < 1) {
                        this.$toast.info('没有文章！', 0)
                        return
                    }
                    this.articleList = data.list
                    this.queryData.pageIndex = data.pageNum
                    this.pages = data.pages
                    this.isPageShow = true
                })
            },
            pageIndexChange(newPageIndex) {
                if (this.queryData.pageIndex !== newPageIndex) {
                    this.queryData.pageIndex = newPageIndex
                    this.getArticleList()
                }
            },
            queryDataByCategory(categoryId, categoryName) {
                this.$router.push({
                    path: '/',
                    query: {
                        categoryId: categoryId,
                        categoryName: categoryName
                    }
                })
            }
        },
        watch: {
            '$route'(to, from) {
                this.$router.go(0)
            }
        }
    }
</script>