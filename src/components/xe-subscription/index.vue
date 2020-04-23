<template>
    <div class="xe-subscription" v-show="isShow">
        <div class="body">
            <div class="close" @click="close" title="关闭">
                <i class="fa fa-close"></i>
            </div>
            <div class="title">
                <strong>订阅博主 🙂</strong>
            </div>
            <div class="content">
                <div class="input">
                    <input type="text" class="email" v-model="email" placeholder="请输入邮箱地址" v-show="isShowEmail">
                    <div style="display: inline-block" v-show="!isShowEmail">
                        <input type="text" v-model="verifyCode" maxlength="6" class="verifyCode" placeholder="请输入验证码">
                        <button style="margin-left: 10px" ref="retryBtn" @click="sendVerifyCode">重试 <span
                                v-html="getRetryTime"></span></button>
                    </div>
                </div>
                <div class="button">
                    <button v-show="isShowEmail" @click="preSubscribe" ref="okBtn">OK <i class="fa fa-check"></i>
                    </button>
                    <button v-show="!isShowEmail" @click="subscribe">订阅 <i class="fa fa-feed"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RegEx from '../../constants/RegEx'
    import * as api from '@/api'

    export default {
        data() {
            return {
                isShow: false,
                isShowEmail: true,
                email: '',
                verifyCode: '',
                retryTime: 0
            }
        },
        computed: {
            getRetryTime() {
                return this.retryTime == 0 ? '<i class="fa fa-refresh"></i>' : this.retryTime
            }
        },
        methods: {
            init() {
                this.isShow = false
                this.isShowEmail = true
                this.email = ''
                this.verifyCode = ''
                this.retryTime = 0
            },
            open() {
                this.isShow = true
                this.disableScroll()
            },
            close() {
                this.isShow = false
                this.disableScroll()
            },
            disableScroll() {
                let overflow = ''
                if (this.isShow) {
                    overflow = 'hidden'
                }
                document.body.style.overflow = overflow
            },
            checkEmail() {
                if (!RegEx.email.test(this.email)) {
                    this.$toast.info('请输入有效的邮箱地址！')
                    throw '请输入有效的邮箱地址！'
                }
            },
            checkVerifyCode() {
                if (this.verifyCode.replace(/\s*/g, "").length != 6) {
                    this.$toast.info("请输入有效的验证码！")
                    throw '请输入有效的验证码！'
                }
            },
            subscribe() {
                this.checkEmail()
                this.checkVerifyCode()

                api.subscribe({
                    email: this.email,
                    code: this.verifyCode
                }).then(resp => {
                    if (resp.code !== 200) {
                        this.$toast.info(resp.message)
                        return
                    }

                    this.$toast.success("感谢您的订阅！")
                    this.init()
                })
            },
            lockRetry(t) {
                this.retryTime = t--
                let retryBtn = this.$refs.retryBtn
                retryBtn.setAttribute('disabled', 'true')
                if (t < 0) {
                    retryBtn.removeAttribute('disabled')
                    return
                }

                setTimeout(() => {
                    this.lockRetry(t)
                }, 1000)
            },
            async sendVerifyCode() {
                this.checkEmail()

                await api.sendVerifyCode(this.email).then(resp => {
                    if (resp.code !== 200) {
                        this.$toast.info(resp.message)
                        return
                    }

                    this.lockRetry(15)
                    this.isShowEmail = false
                    this.$toast.success("验证码已发送到您的邮箱，请注意查收！", 5000)
                })
            },
            async preSubscribe() {
                let okBtn = this.$refs.okBtn
                const originHtml = okBtn.innerHTML

                okBtn.textContent = 'Loading...'
                okBtn.setAttribute('disabled', 'true')

                try {
                    await this.sendVerifyCode()
                } finally {
                    okBtn.innerHTML = originHtml
                    okBtn.removeAttribute('disabled')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @color: #474a4d;
    .xe-subscription {
        position: fixed;
        z-index: 99999;
        background-color: rgba(0, 0, 0, 0.6);
        width: 100vw;
        height: 100vh;
        color: @color;

        .body {
            position: inherit;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #fff;
            box-shadow: 0px 0px 3px 0px #ccc;
            border-radius: 6px;
            width: 85%;
            max-width: 500px;
            height: 200px;
            text-align: center;

            .close {
                position: inherit;
                top: 0;
                right: 0.6rem;
                cursor: pointer;
                color: #2a2a2a;

                &:hover {
                    color: #000;
                }
            }

            .title {
                border-bottom: 1px solid #ccc;
                height: 40px;
                line-height: 40px;
            }

            .content {
                margin: 25px;
                font-size: 16px;

                .input {
                    input {
                        border: 0;
                        outline: none;
                        border-radius: 5px;
                        border: 2px solid @color;
                        box-shadow: 0px 0px 2px 0px #000;
                        text-align: center;
                        background-color: #fafafa;
                        font-size: 14px;
                        height: 30px;

                        &:hover {
                            box-shadow: 0px 0px 5px 0px #000;
                        }
                    }

                    .email {
                        width: 80%;
                        max-width: 220px;
                    }

                    .verifyCode {
                        width: 120px;
                    }
                }

                .button {
                    margin-top: 15px;
                }

                button {
                    width: 80px;
                    height: 35px;
                    background-color: @color;
                    border: 0;
                    outline: none;
                    cursor: pointer;
                    color: #d3cbc6;
                    box-shadow: 0px 0px 2px 0px #000;
                    border-radius: 5px;

                    &:hover {
                        box-shadow: 0px 0px 5px 0px #000;
                    }
                }
            }
        }
    }
</style>