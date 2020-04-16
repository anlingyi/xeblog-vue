import toastComponent from './toast'

const Toast = {
    install: (vue) => {
        vue.prototype.$toast = {
            open(text, type = 'info', duration = 3000) {
                const ToastConstructor = vue.extend(toastComponent)
                const toast = new ToastConstructor()
                toast.text = text
                toast.type = type

                toast.$mount(document.createElement('div'))
                document.body.appendChild(toast.$el)

                if (duration === 0) {
                    return
                }

                setTimeout(() => {
                    toast.$el.remove()
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