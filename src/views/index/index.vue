<template>
    <xe-container>
        <div class="articles">
            <div class="article" v-for="article in articleList" :key="article.id">
                <h2 class="article-title" v-text="article.title">
                </h2>
                <div class="article-mark">
                    <i class="fa fa-calendar-o"></i>&nbsp;<span class="article-send-time"
                                                                v-text="article.createTime"></span>&nbsp;|
                    <i class="fa fa-leaf"></i>&nbsp;<span class="article-category"><a
                        :href="'/?categoryId=' + article.categoryId" v-text="article.categoryName"></a></span>&nbsp;|
                    <i class="fa fa-eye"></i>&nbsp;<span class="article-read-count" v-text="article.pageviews"></span>
                </div>
                <div class="article-info" v-text="article.brief">
                </div>
                <div class="article-info-image" v-if="article.cover !== ''">
                    <img :src="article.cover">
                </div>
            </div>
        </div>
        <xe-pagination :pageIndex="queryData.pageIndex" :pageSize="pages" @pageIndexChange="pageIndexChange"
                       v-if="pages > 0"/>
    </xe-container>
</template>

<script>
    import * as api from '@/api'

    export default {
        data() {
            return {
                articleList: [],
                pages: 0,
                queryData: {
                    pageIndex: 1,
                    pageSize: 10,
                    query: '',
                    tag: '',
                    categoryId: ''
                }
            }
        },
        methods: {
            getArticleList() {
                api.articleList(this.queryData).then(resp => {
                    const data = resp.data
                    this.articleList = data.list
                    this.queryData.pageIndex = data.pageNum
                    this.pages = data.pages
                })
            },
            pageIndexChange(newPageIndex) {
                this.queryData.pageIndex = newPageIndex
            }
        },
        watch: {
            queryData: {
                handler: function () {
                    this.getArticleList()
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>
</style>