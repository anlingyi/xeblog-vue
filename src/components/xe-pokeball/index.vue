<template>
  <div class="xe-pokeball" v-drag @touchmove.prevent>
    <div class="ball">
      <div class="top" title="最热" @click="hotList"></div>
      <div class="center">
        <div class="open" title="就决定是你啦～" @click="randomOne"></div>
      </div>
      <div class="bottom" title="最新" @click="latestList"></div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'

export default {
  data() {
    return {
      isDrag: false
    }
  },
  methods: {
    hotList() {
      if (this.isDrag) {
        return
      }

      this.$router.push({
        path: '/?sort=2'
      })
    },
    latestList() {
      if (this.isDrag) {
        return
      }

      this.$router.push({
        path: '/?sort=1'
      })
    },
    randomOne() {
      if (this.isDrag) {
        return
      }

      api.randomArticle().then(resp => {
        const data = resp.data
        if (!data || this.$route.params.id == data) {
          this.$toast.info('再来一次~', 5000)
          return
        }

        this.$toast.success('就决定是你啦~')
        this.$router.push({
          path: '/articles/' + data
        })
      })
    }
  },
  watch: {
    '$route'(to, from) {
      this.$router.go(0);
    }
  },
  directives: {
    drag(el, binding, vnode) {
      el.onmousedown = (e) => {
        const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
        const clientWidth = document.body.clientWidth
        const elWidth = el.clientWidth
        const elHeight = el.clientHeight

        const startX = e.pageX - el.offsetLeft
        const startY = e.pageY - el.offsetTop
        const startTime = new Date().getTime();

        vnode.context.isDrag = false
        document.onmousemove = (e) => {
          const endTime = new Date().getTime();
          if (endTime - startTime > 50) {
            vnode.context.isDrag = true
          }

          let endX = e.pageX - startX
          endX = endX <= 0 ? 0 : endX;
          if (endX + elWidth >= clientWidth) {
            endX = clientWidth - elWidth
          }

          let endY = e.pageY - startY
          endY = endY <= 0 ? elHeight / 2 : endY
          if (endY + elHeight / 2 >= clientHeight) {
            endY = clientHeight - elHeight / 2
          }

          el.style.left = endX + 'px'
          el.style.top = endY + 'px'
        }

        document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null
        }
      }

      el.ontouchstart = (e) => {
        const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
        const clientWidth = document.body.clientWidth
        const elWidth = el.clientWidth
        const elHeight = el.clientHeight

        const touch = e.targetTouches[0]
        const startX = touch.pageX - el.offsetLeft
        const startY = touch.pageY - el.offsetTop

        document.ontouchmove = (e) => {
          const touch = e.targetTouches[0]
          let endX = touch.pageX - startX
          endX = endX <= 0 ? 0 : endX;
          if (endX + elWidth >= clientWidth) {
            endX = clientWidth - elWidth
          }

          let endY = touch.pageY - startY
          endY = endY <= 0 ? elHeight / 2 : endY
          if (endY + elHeight / 2 >= clientHeight) {
            endY = clientHeight - elHeight / 2
          }

          el.style.left = endX + 'px'
          el.style.top = endY + 'px'
        }

        document.ontouchend = () => {
          document.ontouchmove = document.ontouchend = null
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@ball-width: 30px;
@ball-suture: 1px;

.xe-pokeball {
  z-index: 9999999;
  width: @ball-width;
  height: @ball-width;
  position: fixed;
  top: 50%;
  right: 2%;
  transform: translateY(-50%);

  .ball {
    position: absolute;
    width: @ball-width;
    height: @ball-width;

    &:hover {
      width: @ball-width * 2;
      height: @ball-width * 2;

      .top {
        border-bottom-width: @ball-suture * 2;
      }

      .bottom {
        border-top-width: @ball-suture * 2;
      }

      .center {
        border-width: @ball-suture * 4;
      }
    }

    .top {
      height: 50%;
      background-color: #ca1324;
      border-radius: 100px 100px 0 0;
      border-bottom: @ball-suture solid #1b1f23;

      &:hover {
        cursor: pointer;
        background-color: #f50524;
      }
    }

    .bottom {
      height: 50%;
      background-color: #f1f1f1;
      border-radius: 0 0 100px 100px;
      border-top: @ball-suture solid #1b1f23;

      &:hover {
        cursor: pointer;
        background-color: #fff;
      }
    }

    .center {
      position: absolute;
      width: 30%;
      height: 30%;
      background-color: #f6f5f5;
      border: @ball-suture * 2 solid #1b1f23;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      cursor: pointer;
    }

    .open {
      position: absolute;
      width: 80%;
      height: 80%;
      background-color: #ffffff;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      box-shadow: 0px 0px 5px 0px #ccc;

      &:hover {
        background-color: #f5f3f3;
        box-shadow: 0px 0px 10px 0px #bf0606;
      }
    }
  }

}
</style>