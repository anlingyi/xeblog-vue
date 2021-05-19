<template>
  <div>
    <div class="xe-pokeball" v-drag @touchmove.prevent>
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