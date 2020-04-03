<template>
    <xe-container>
        <div class="categories">
            <span v-for="category in categories" :key="category.id" :style="randomStyle">
                {{ category.name + ' (' + category.total + ')' }}
            </span>
        </div>
    </xe-container>
</template>

<script>
    export default {
        data() {
            return {
                categories: [
                    {
                        id: 1,
                        name: '记录',
                        total: 20
                    },
                    {
                        id: 2,
                        name: '设计模式',
                        total: 5
                    },
                    {
                        id: 3,
                        name: '算法',
                        total: 1
                    },
                    {
                        id: 4,
                        name: 'Java',
                        total: 34
                    },
                    {
                        id: 5,
                        name: '前端',
                        total: 3
                    },
                    {
                        id: 6,
                        name: '记录',
                        total: 20
                    },
                    {
                        id: 7,
                        name: '设计模式',
                        total: 5
                    },
                    {
                        id: 8,
                        name: '算法',
                        total: 1
                    },
                    {
                        id: 9,
                        name: 'Java',
                        total: 34
                    },
                    {
                        id: 10,
                        name: '前端',
                        total: 3
                    }
                ],
                styles: [
                    {
                        backgroundColor: '#aaa',
                        color: '#fff'
                    },
                    {
                        backgroundColor: '#9effca',
                        color: '#000'
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