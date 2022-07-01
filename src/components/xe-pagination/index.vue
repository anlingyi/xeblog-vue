<template>
    <div class="pagination">
        <button class="firstPage" title="首页" v-show="this.page != 1" @click="() => this.page = 1">
            <i class="fa fa-angle-double-left"></i>
        </button>
        <button class="previous" title="上一页" v-show="this.page > 1" @click="previous">
            <i class="fa fa-angle-left"></i>
        </button>
        <button class="pageIndex" title="当前页码">
            {{ this.page }}
        </button>
        <button class="next" title="下一页" v-show="this.page < this.pages" @click="next">
            <i class="fa fa-angle-right"></i>
        </button>
        <button class="lastPage" title="尾页" v-show="this.page != this.pages" @click="() => this.page = this.pages">
            <i class="fa fa-angle-double-right"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: ['pageIndex', 'pageSize'],
    data() {
        return {
            page: this.pageIndex,
            pages: this.pageSize
        }
    },
    methods: {
        previous() {
            if (this.page == 1) {
                return
            }
            this.page--
        },
        next() {
            if (this.page == this.pages) {
                return
            }
            this.page++
        }
    },
    watch: {
        page() {
            this.$emit('pageIndexChange', this.page)
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

    .firstPage, .next {
        margin-right: 10px;
    }

    .pageIndex {
        margin: 0 30px;
        background-color: #474a4d;

        &:hover {
            color: #d3cbc6;
            box-shadow: 0px 0px 5px 3px #ccc;
        }
    }
}
</style>