<template>
  <div class="xe-pokeball">
    <div class="ball-wrap" v-drag @touchmove.prevent>
      <div class="ball">
        <div class="top" title="最热" @click="hotList"></div>
        <div class="center">
          <div class="open" title="就决定是你啦～" @click="randomOne"></div>
        </div>
        <div class="bottom" title="最新" @click="latestList"></div>
      </div>
    </div>
    <div class="pokemon">
      <img :hidden="hiddenPokemon" v-if="curPokemon !== ''" :src="curPokemon.image" :title="curPokemon.name"
           v-drag @touchmove.prevent
           @mousedown.prevent @dblclick="() => this.hiddenPokemon = true"/>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'

export default {
  data() {
    return {
      isDrag: false,
      hiddenPokemon: false,
      curPokemon: '',
      pokemon: [
        {
          name: '皮卡丘',
          image: 'Pikachu.gif'
        },
        {
          name: '霜奶仙',
          image: 'Alcremie.gif'
        },
        {
          name: '美丽花',
          image: 'Bellossom.gif'
        },
        {
          name: '甜竹竹',
          image: 'Bounsweet.gif'
        },
        {
          name: '妙蛙种子',
          image: 'Bulbasaur.gif'
        },
        {
          name: '时拉比',
          image: 'Celebi.gif'
        },
        {
          name: '吉利蛋',
          image: 'Chansey.gif'
        },
        {
          name: '小火龙',
          image: 'Charmander.gif'
        },
        {
          name: '菊草叶',
          image: 'Chikorita.gif'
        },
        {
          name: '奇诺栗鼠',
          image: 'Cinccino.gif'
        },
        {
          name: '皮皮',
          image: 'Clefairy.gif'
        },
        {
          name: '喷嚏熊',
          image: 'Cubchoo.gif'
        },
        {
          name: '咚咚鼠',
          image: 'Dedenne.gif'
        },
        {
          name: '伊布',
          image: 'Eevee.gif'
        },
        {
          name: '白蓬蓬',
          image: 'Eldegoss.gif'
        },
        {
          name: '幼棉棉',
          image: 'Gossifleur.gif'
        },
        {
          name: '敲音猴',
          image: 'Grookey.gif'
        },
        {
          name: '胖丁',
          image: 'Jigglypuff.gif'
        },
        {
          name: '基拉祈',
          image: 'Jirachi.gif'
        },
        {
          name: '玛纳霏',
          image: 'Manaphy.gif'
        },
        {
          name: '梦幻',
          image: 'Mew.gif'
        },
        {
          name: '莫鲁贝可',
          image: 'Morpeko.gif'
        },
        {
          name: '九尾',
          image: 'Ninetales.gif'
        },
        {
          name: '皮丘',
          image: 'Pichu.gif'
        },
        {
          name: '可达鸭',
          image: 'Psyduck.gif'
        },
        {
          name: '小拉达',
          image: 'Rattata.gif'
        },
        {
          name: '谢米',
          image: 'Shaymin.gif'
        },
        {
          name: '杰尼龟',
          image: 'Squirtle.gif'
        },
        {
          name: '甜舞妮',
          image: 'Steenee.gif'
        },
        {
          name: '仙子伊布',
          image: 'Sylveon.gif'
        },
        {
          name: '比克提尼',
          image: 'Victini.gif'
        },
        {
          name: '六尾',
          image: 'Vulpix.gif'
        },
        {
          name: '毛辫羊',
          image: 'Wooloo.gif'
        },
        {
          name: '来电汪',
          image: 'Yamper.gif'
        },
        {
          name: '皮可西',
          image: 'Clefable.gif'
        },
        {
          name: '走路草',
          image: 'Oddish.gif'
        },
        {
          name: '臭臭花',
          image: 'Gloom.gif'
        },
        {
          name: '三地鼠',
          image: 'Dugtrio.gif'
        },
        {
          name: '喵喵',
          image: 'Meowth.gif'
        },
        {
          name: '卡蒂狗',
          image: 'Growlithe.gif'
        },
        {
          name: '蚊香蝌蚪',
          image: 'Poliwag.gif'
        },
        {
          name: '凯西',
          image: 'Abra.gif'
        },
        {
          name: '小拳石',
          image: 'Geodude.gif'
        },
        {
          name: '小火马',
          image: 'Ponyta.gif'
        },
        {
          name: '呆呆兽',
          image: 'Slowpoke.gif'
        },
        {
          name: '大葱鸭',
          image: 'Farfetchd.gif'
        },
        {
          name: '小海狮',
          image: 'Seel.gif'
        },
        {
          name: '臭泥',
          image: 'Grimer.gif'
        },
        {
          name: '鬼斯',
          image: 'Gastly.gif'
        },
        {
          name: '大岩蛇',
          image: 'Onix.gif'
        },
        {
          name: '卡拉卡拉',
          image: 'Cubone.gif'
        },
        {
          name: '大舌头',
          image: 'Lickitung.gif'
        },
        {
          name: '双弹瓦斯',
          image: 'Weezing.gif'
        },
        {
          name: '角金鱼',
          image: 'Goldeen.gif'
        },
        {
          name: '迷唇姐',
          image: 'Jynx.gif'
        },
        {
          name: '鲤鱼王',
          image: 'Magikarp.gif'
        },
        {
          name: '暴鲤龙',
          image: 'Gyarados.gif'
        },
        {
          name: '百变怪',
          image: 'Ditto.gif'
        },
        {
          name: '化石翼龙',
          image: 'Aerodactyl.gif'
        },
        {
          name: '卡比兽',
          image: 'Snorlax.gif'
        },
        {
          name: '超梦',
          image: 'Mewtwo.gif'
        },
        {
          name: '小锯鳄',
          image: 'Totodile.gif'
        },
        {
          name: '玛力露',
          image: 'Marill.gif'
        },
        {
          name: '向日花怪',
          image: 'Sunflora.gif'
        },
        {
          name: '太阳伊布',
          image: 'Espeon.gif'
        },
        {
          name: '呆呆王',
          image: 'Slowking.gif'
        },
        {
          name: '梦妖',
          image: 'Misdreavus.gif'
        },
        {
          name: '果然翁',
          image: 'Wobbuffet.gif'
        },
        {
          name: '熊宝宝',
          image: 'Teddiursa.gif'
        },
        {
          name: '鸭嘴宝宝',
          image: 'Magby.gif'
        },
        {
          name: '凤王',
          image: 'Ho-Oh.gif'
        },
        {
          name: '蘑蘑菇',
          image: 'Shroomish.gif'
        },
        {
          name: '过动猿',
          image: 'Vigoroth.gif'
        },
        {
          name: '向尾喵',
          image: 'Skitty.gif'
        },
        {
          name: '正电拍拍',
          image: 'Plusle.gif'
        },
        {
          name: '负电拍拍',
          image: 'Minun.gif'
        },
        {
          name: '煤炭龟',
          image: 'Torkoal.gif'
        },
        {
          name: '风铃铃',
          image: 'Chimecho.gif'
        },
        {
          name: '小火焰猴',
          image: 'Chimchar.gif'
        },
        {
          name: '谜拟Ｑ',
          image: 'Mimikyu.gif'
        },
        {
          name: '托戈德玛尔',
          image: 'Togedemaru.gif'
        },
        {
          name: '树枕尾熊',
          image: 'Komala.gif'
        }
      ]
    }
  },
  mounted() {
    if (this.$route.query.pokemon) {
      this.randomPokemon()
    }
  },
  methods: {
    randomPokemon() {
      const pokemon = this.pokemon[Math.floor(Math.random() * this.pokemon.length)]
      this.curPokemon = {
        name: '你好，我是' + pokemon.name + '～',
        image: require('@/assets/images/pokemon/' + pokemon.image)
      }
    },
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
          path: '/articles/' + data + '?pokemon=1'
        })
      })
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.path !== from.path) {
        this.$router.go(0);
      }
    }
  },
  directives: {
    drag(el, binding, vnode) {
      /**
       * 获取客户端可见内容的高度
       *
       * @returns {number}
       */
      const getClientHeight = () => {
        return window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
      }

      /**
       * 获取客户端可见内容的宽度
       *
       * @returns {number}
       */
      const getClientWidth = () => {
        return window.innerWidth || Math.min(document.documentElement.clientWidth, document.body.clientWidth)
      }

      /**
       * startX = null:获取鼠标相对于元素（左上顶点）的x轴坐标（移动前坐标）
       * startX != null:获取移动后的左上顶点x轴坐标
       *
       * e.clientX:鼠标相对客户端（客户端左上顶点）的x轴坐标
       * el.offsetLeft:元素顶点（左上顶点）相对客户端（客户端左上顶点）的x轴坐标（元素必须脱离文档流，position: fixed or absolute）
       * el.clientWidth:元素宽度
       *
       * @param el
       * @param e
       * @param startX
       * @returns {number}
       */
      const getX = (el, e, startX) => {
        if (startX === null) {
          // 返回鼠标相对于元素（左上顶点）的x轴坐标
          return e.clientX - el.offsetLeft
        }

        // 客户端可视宽度
        const clientWidth = getClientWidth()
        // 元素自身宽度
        const elWidth = el.clientWidth

        // 移动到x轴位置
        let x = e.clientX - startX
        // 水平方向边界处理
        if (x <= 0) {
          // x轴最小为0
          x = 0
        } else if (x + elWidth > clientWidth) {
          // x是左上顶点的坐标，是否触碰到右边边界（超出可视宽度）要通过右顶点判断，所以需要加上元素自身宽度
          x = clientWidth - elWidth
        }

        return x
      }

      /**
       * startY = null:获取鼠标相对于元素（左上顶点）的y轴坐标（移动前坐标）
       * startY != null:获取移动后的左上顶点y轴坐标
       *
       * e.clientY:鼠标相对客户端（客户端左上顶点）的y轴坐标
       * el.offsetTop:元素顶点（左上顶点）相对客户端（客户端左上顶点）的y轴坐标（元素必须脱离文档流，position: fixed or absolute）
       * el.clientHeight:元素高度
       *
       * @param el
       * @param e
       * @param startY
       * @returns {number}
       */
      const getY = (el, e, startY) => {
        if (startY === null) {
          // 返回鼠标相对于元素（左上顶点）的y轴坐标
          return e.clientY - el.offsetTop
        }

        // 客户端可视高度
        const clientHeight = getClientHeight()
        // 元素自身高度
        const elHeight = el.clientHeight

        // 移动到y轴位置
        let y = e.clientY - startY
        // 垂直方向边界处理
        if (y <= 0) {
          // y轴最小为0
          y = 0
        } else if (y + elHeight > clientHeight) {
          // 同理，判断是否超出可视高度要加上自身高度
          y = clientHeight - elHeight
        }

        return y
      }

      /**
       * 监听鼠标按下事件（PC端拖动）
       *
       * @param e
       */
      el.onmousedown = (e) => {
        vnode.context.isDrag = false

        // 获取当前位置信息 (startX,startY)
        const startX = getX(el, e, null)
        const startY = getY(el, e, null)

        /**
         * 监听鼠标移动事件
         *
         * @param e
         */
        document.onmousemove = (e) => {
          // 标记正在移动，解决元素移动后点击事件被触发的问题
          vnode.context.isDrag = true

          // 更新元素位置（移动元素）
          el.style.left = getX(el, e, startX) + 'px'
          el.style.top = getY(el, e, startY) + 'px'
        }

        /**
         * 监听鼠标松开事件
         */
        document.onmouseup = () => {
          // 移除鼠标相关事件，防止元素无法脱离鼠标
          document.onmousemove = document.onmouseup = null
        }
      }

      /**
       * 监听手指按下事件（移动端拖动）
       * @param e
       */
      el.ontouchstart = (e) => {
        // 获取被触摸的元素
        const touch = e.targetTouches[0]
        // 获取当前位置信息 (startX,startY)
        const startX = getX(el, touch, null)
        const startY = getY(el, touch, null)

        /**
         * 监听手指移动事件
         * @param e
         */
        document.ontouchmove = (e) => {
          // 获取被触摸的元素
          const touch = e.targetTouches[0]
          // 更新元素位置（移动元素）
          el.style.left = getX(el, touch, startX) + 'px'
          el.style.top = getY(el, touch, startY) + 'px'
        }

        /**
         * 监听手指移开事件
         */
        document.ontouchend = () => {
          // 移除touch相关事件，防止元素无法脱离手指
          document.ontouchmove = document.ontouchend = null
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.xe-pokeball {
  .pokemon {
    position: absolute;
    z-index: 99999999;

    img {
      position: fixed;
      bottom: 5%;
      right: 5%;
      cursor: pointer;
    }
  }

  @ball-diameter: 30px;
  @ball-suture: 1px;

  .ball-wrap {
    z-index: 9999999;
    width: @ball-diameter;
    height: @ball-diameter;
    position: fixed;
    top: 50%;
    right: 2%;

    .ball {
      position: absolute;
      width: 100%;
      height: 100%;

      &:hover {
        width: @ball-diameter * 2;
        height: @ball-diameter * 2;

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
}
</style>