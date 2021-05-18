<template>
  <div class="xe-pokeball" v-drag>
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
  methods: {
    hotList() {
      this.$router.push({
        path: '/?sort=2'
      })
    },
    latestList() {
      this.$router.push({
        path: '/?sort=1'
      })
    },
    randomOne() {
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
    drag(el) {
      el.onmousedown = (e) => {
        let startX = e.pageX - el.offsetLeft
        let startY = e.pageY - el.offsetTop

        let clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
        let clientWidth = document.body.clientWidth

        document.onmousemove = (e) => {
          let endX = e.pageX - startX
          endX = endX <= 0 ? 0 : endX;
          if (endX + el.clientWidth >= clientWidth) {
            endX = clientWidth - el.clientWidth
          }

          let endY = e.pageY - startY
          endY = endY <= 0 ? el.clientHeight / 2 : endY
          if (endY + el.clientHeight / 2 >= clientHeight) {
            endY = clientHeight - el.clientHeight / 2
          }

          el.style.left = endX + 'px'
          el.style.top = endY + 'px'
        }

        document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@ball-width: 60px;
@ball-suture: 2px solid #1b1f23;

.xe-pokeball {
  z-index: 9999999;
  width: @ball-width;
  height: @ball-width;
  position: fixed;
  top: 50%;
  right: 1%;
  transform: translateY(-50%);

  .ball {
    position: relative;
    border-radius: 50%;
    box-shadow: 0px 0px 1px 0px #ccc;

    .top {
      width: @ball-width;
      height: @ball-width / 2;
      background-color: #ca1324;
      border-radius: @ball-width @ball-width 0 0;
      border-bottom: @ball-suture;
    }

    .top:hover {
      cursor: pointer;
      background-color: #f50524;
    }

    .bottom {
      width: @ball-width;
      height: @ball-width / 2;
      background-color: #fafafa;
      border-radius: 0 0 @ball-width @ball-width;
      border-top: @ball-suture;
    }

    .bottom:hover {
      cursor: pointer;
      background-color: #fff;
    }

    @center-width: @ball-width / 3;

    .center {
      position: absolute;
      width: @center-width;
      height: @center-width;
      background-color: #f6f5f5;
      border: 3px solid #1b1f23;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      cursor: pointer;
    }

    .open {
      position: absolute;
      width: @center-width / 1.5;
      height: @center-width / 1.5;
      background-color: #ffffff;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      box-shadow: 0px 0px 5px 0px #ccc;
    }

    .open:hover {
      background-color: #f5f3f3;
      box-shadow: 0px 0px 10px 0px #bf0606;
    }
  }

}
</style>