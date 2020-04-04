import toastComponent from './toast'

const Toast = {
    install: (vue) => {
        const ToastConstructor = vue.extend(toastComponent)
        const toast = new ToastConstructor()

        toast.$mount(document.createElement('div'))
        document.body.appendChild(toast.$el)

        vue.prototype.$toast = {
            open(text, type = 'info', duration = 3000) {
                toast.text = text
                toast.type = type
                toast.isShow = true

                if (duration === 0) {
                    return
                }

                setTimeout(() => {
                    toast.isShow = false
                }, duration)
            },
            success(text, duration) {
                this.open(text, 'success', duration)
            },
            info(text, duration) {
                this.open(text, 'info', duration)
            },
            error(text, duration) {
                this.open(text, 'error', duration)
            },
            warning(text, duration) {
                this.open(text, 'warning', duration)
            }
        }
    }

}

export default Toast