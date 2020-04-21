<template>
    <xe-container>
        <div class="categories">
            <span v-for="category in categories" :key="category.id" :style="randomStyle"
                  @click="queryDataByCategory(category.id, category.name)">
                {{ category.name + ' (' + category.articleCount + ')' }}
            </span>
        </div>
    </xe-container>
</template>

<script>
    import * as api from '@/api'

    export default {
        data() {
            return {
                categories: [],
                styles: [
                    {
                        backgroundColor: '#aaa',
                        color: '#fff'
                    },
                    {
                        backgroundColor: '#7a4171',
                        color: '#fff'
                    },
                    {
                        backgroundColor: '#38b48b',
                        color: '#fff'
                    },
                    {
                        backgroundColor: '#a99e93',
                        color: '#fff'
                    },
                    {
                        backgroundColor: '#f8b862',
                        color: '#fff'
                    },
                    {
                        backgroundColor: '#c8d5bb',
                        color: '#000'
                    },
                    {
                        backgroundColor: '#bed2c3',
                        color: '#000'
                    },
                    {
                        backgroundColor: '#888084',
                        color: '#fff'
                    },
                    {
                        backgroundColor: '#ee836f',
                        color: '#fff'
                    },
                    {
                        backgroundColor: '#2e2930',
                        color: '#fff'
                    }
                ],
            }
        },
        computed: {
            randomStyle: {
                cache: false,
                get() {
                    return this.styles[Math.floor(Math.random() * this.styles.length)]
                }
            }
        },
        methods: {
            getCategoryList() {
                api.categoryList().then(resp => {
                    if (!resp.data || resp.data.length < 1) {
                        this.$toast.info('没有分类！')
                        return
                    }
                    this.categories = resp.data
                })
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
        mounted() {
            this.getCategoryList()
        }
    }
</script>

<style lang="less" scoped>
    .categories {
        background-color: #fff;
        height: 100vh;
        padding: 20px;

        span {
            display: inline-block;
            padding: 10px;
            margin: 10px 10px;
            cursor: pointer;
            border-radius: 10px;
            outline: none;
            box-shadow: 0px 0px 5px 0px #ccc;

            &:hover {
                box-shadow: 0px 0px 5px 2px #ccc;
            }
        }
    }
</style>