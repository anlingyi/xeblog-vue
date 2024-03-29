<template>
    <xe-container>
        <div class="archive">
            <div class="timeline">
                <ul>
                    <template v-for="obj in archives">
                        <li class="year">
                            <div class="info">
                                <div class="bullet"></div>
                                <div class="content" v-text="obj.year">
                                </div>
                            </div>
                        </li>
                        <li class="date" v-for="article in obj.articles">
                            <div class="info">
                                <div class="bullet"></div>
                                <div class="content" @click="goArticleInfo(article.id)">
                                    <span class="time" v-text="article.date"></span> {{ article.title }}
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </xe-container>
</template>

<script>
import * as api from '@/api'

export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            pages: 0,
            archives: []
        }
    },
    mounted() {
        this.getArchives()

        document.addEventListener('scroll', () => {
            // 文档实际高度（包括不可见内容的高度）
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
            // 文档可见内容的高度
            let clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
            // 文档内容顶部（垂直滚动时顶部的内容会被隐藏）到它的视口可见内容（实际可以看见的内容顶部）的距离
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

            // 判断垂直滚动条是否滚动到最底部： scrollHeight - scrollTop === clientHeight
            if (scrollHeight - scrollTop <= clientHeight) {
                if (this.pageIndex < this.pages) {
                    this.pageIndex++
                    this.getArchives()
                }
            }
        })
    },
    methods: {
        goArticleInfo(id) {
            this.$router.push({
                path: '/articles/' + id,
            })
        },
        getArchives() {
            api.archives({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }).then(resp => {
                if (!resp.data || !resp.data.list) {
                    this.$toast.info('没有数据！', 0)
                    return
                }

                this.pageIndex = resp.data.pageNum
                this.pages = resp.data.pages

                const list = resp.data.list

                let current = {
                    year: '',
                    articles: []
                }

                if (this.archives.length > 0) {
                    current = this.archives[this.archives.length - 1]
                }

                for (let index in list) {
                    let obj = list[index]
                    let time = obj.createTime
                    let year = time.substr(0, time.indexOf('-'))
                    let date = time.substr(time.indexOf('-') + 1)

                    let article = {
                        id: obj.id,
                        title: obj.title,
                        date: date
                    }

                    if (year === current.year) {
                        current.articles.push(article)
                        continue
                    }

                    current = {
                        year: year,
                        articles: [article]
                    }

                    this.archives.push(current)
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.archive {
    border: 1px solid transparent;
    min-height: 80vh;
    display: flex;
    align-content: center;

    .timeline {
        margin: 10px auto;
        padding: 10px 10px;

        ul {
            list-style: none;
            position: relative;

            div {
                display: inline-block;
                vertical-align: middle;
            }

            .info {
                margin: 15px 0;

                &:hover {
                    .bullet {
                        border: 2px solid #ccc;
                        box-shadow: 0px 0px 5px 0px #ccc;
                    }

                    .content {
                        box-shadow: 0px 0px 3px 0px #ccc;
                    }
                }
            }

            &:before {
                content: ' ';
                width: 5px;
                height: 100%;
                background-color: #d9d9d9;
                position: absolute;
                top: 0;
                left: 2.9rem;
            }

            .bullet {
                position: relative;
                width: 1rem;
                height: 1rem;
                box-sizing: border-box;
                border-radius: 50%;
                background: #fff;
                margin-right: 1rem;
            }

            .content {
                position: relative;
                border: 1px solid #f0f0f0;
                padding: 10px;
                background-color: #fff;
                max-width: 70%;
                cursor: pointer;
                color: #333333;
                @media (min-width: 600px) {
                    max-width: 85%;
                }
            }

            .date {

                .bullet {
                    background-color: #fff;
                    border: 3px solid #ccc;
                }

                .content {
                    @bgc: #fff;
                    background-color: @bgc;
                    border-radius: 8px;

                    &:before {
                        content: ' ';
                        width: 0px;
                        height: 0px;
                        line-height: 0;
                        font-size: 0;
                        border-color: transparent @bgc transparent transparent;
                        border-width: 6px 12px;
                        border-style: solid;
                        display: inline-block;
                        position: absolute;
                        top: 50%;
                        left: -23px;
                        transform: translateY(-50%);
                    }
                }

                .time {
                    font-weight: bold;
                    color: #333333;
                }
            }

            .year {

                .bullet {
                    background-color: #474a4d;
                    border: 3px solid #ccc;
                }

                .content {
                    @bgc: #474a4d;
                    background-color: @bgc;
                    border-radius: 10px;
                    color: #d3cbc6;
                    padding: 7px;

                    &:before {
                        content: ' ';
                        width: 0px;
                        height: 0px;
                        line-height: 0;
                        font-size: 0;
                        border-color: transparent @bgc transparent transparent;
                        border-width: 6px 12px;
                        border-style: solid;
                        display: inline-block;
                        position: absolute;
                        top: 50%;
                        left: -23px;
                        transform: translateY(-50%);
                    }
                }
            }
        }
    }
}
</style>