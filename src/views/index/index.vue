<template>
    <xe-container>
        <div class="queryData">
          <div v-if="this.queryData.tag !== ''">
            <span>标签：</span><span class="tag">{{ this.queryData.tag }}</span>
          </div>
          <div v-if="categoryName !== ''">
            <span>分类：</span><span class="category">{{ this.categoryName }}</span>
          </div>
          <div v-if="queryData.query !== ''">
            <span>搜索关键字：</span> <span class="keyword">" {{ this.queryData.query }} "</span>
          </div>
          <div v-if="queryData.sort !== ''">
            <span>排序：</span> <span class="sort">{{ this.queryData.sort == 2 ? '最热' : '最新' }}</span>
          </div>
        </div>
        <div class="articles">
            <div class="article" v-for="article in articleList" :key="article.id">
                <h2 class="article-title">
                    <a :href="'/articles/' + article.id" v-text="article.title"></a>
                </h2>
                <div class="article-mark">
                  <i class="fa fa-calendar-check-o"></i> <span class="article-send-time"
                                                               v-text="article.createTime"></span>
                  <span class="article-seg">｜</span>
                  <i class="fa fa-leaf"></i> <span class="article-category">
                    <a :href="'/?categoryId=' + article.categoryId + '&categoryName=' + article.categoryName"
                       v-text="article.categoryName"></a>
                    </span>
                  <span class="article-seg">｜</span>
                  <i class="fa fa-eye"></i>&nbsp;<span class="article-read-count" v-text="article.pageviews"></span>
                  <span v-if="article.top">&nbsp;<i class="fa fa-diamond" title="置顶" style="color: #45b7d9"></i></span>
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
                categoryName: this.$route.query.categoryName || '',
                queryData: {
                  pageIndex: 1,
                  pageSize: 10,
                  query: this.$route.query.query || '',
                  tag: this.$route.query.tag || '',
                  categoryId: this.$route.query.categoryId || '',
                  sort: this.$route.query.sort || ''
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
            }
        },
        watch: {
            '$route'(to, from) {
                this.$router.go(0)
            }
        }
    }
</script>