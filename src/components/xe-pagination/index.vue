<template>
    <div class="pagination">
        <button class="previous" title="上一页" v-show="this.pageIndex > 1" @click="previous">
            &lt;
        </button>
        <button class="pageIndex" title="当前页码">
            {{ this.pageIndex }}
        </button>
        <button class="next" title="下一页" v-show="this.pageIndex < this.pages" @click="next">
            &gt;
        </button>
    </div>
</template>

<script>
    export default {
        props: ['pageIndex', 'pages'],
        methods: {
            previous() {
                if (this.pageIndex == 1) {
                    return
                }
                this.pageIndex--
            },
            next() {
                if (this.pageIndex == this.pages) {
                    return
                }
                this.pageIndex++
            }
        }
    }
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;

        button {
            outline: none;
            min-width: 35px;
            min-height: 35px;
            border-radius: 50%;
            box-shadow: 0px 0px 5px 3px #ccc;
            border: 0;
            background-color: #474a4d;
            color: #d3cbc6;
            cursor: pointer;
            font-size: 15px;

            &:hover {
                color: #eaf4fc;
                box-shadow: 0px 0px 5px 2px #fff;
            }
        }

        .pageIndex {
            margin: 0 30px;
        }
    }
</style>