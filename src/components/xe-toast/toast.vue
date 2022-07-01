<template>
    <transition name="fade">
        <div :class="type">
            <i :class="getIcon"></i>&nbsp;
            {{ text }}
            &nbsp;<i class="fa fa-close" style="cursor: pointer;" title="关闭" @click="close"></i></div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            type: 'info',
            text: '',
        }
    },
    computed: {
        getIcon() {
            switch (this.type) {
                case 'success':
                    return 'fa fa-check-circle'
                case 'info':
                    return 'fa fa-info-circle'
                case 'error':
                    return 'fa fa-times-circle'
                case 'warning':
                    return 'fa fa-exclamation-triangle'
                default:
                    return ''
            }
        }
    },
    methods: {
        close() {
            this.$el.remove()
        }
    }
}
</script>

<style lang="less" scoped>
div {
    min-width: 350px;
    position: fixed;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    z-index: 100000;
    border-radius: 8px;
    box-shadow: 0px 0px 3px 0px #ccc;
    border: 1px solid transparent;
    font-size: 15px;
    text-align: center;
    margin-top: 10px;
}

@media (max-width: 950px) {
    div {
        top: 20%;
    }
}

.info {
    background-color: #edf2fc;
    border-color: #EBEEF5;
    color: #909399;
}

.success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67C23A;
}

.warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #E6A23C;
}

.error {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #F56C6C;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>