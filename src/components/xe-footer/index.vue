<template>
    <footer>
        <div v-html="getFooterInfo()">
        </div>
    </footer>
</template>

<script>
    export default {
        methods: {
            getFooterInfo() {
                return this.$websiteInfo.copyright
            }
        }
    }
</script>

<style scoped>
    footer {
        margin-top: 20px;
        margin-bottom: 10px;
        width: 100%;
        min-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #555;
        z-index: -1;
    }
</style>