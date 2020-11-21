<template>
  <xe-container>
    <div class="footprint">
      {{ footprintInfo }}
      <br/>
      lng:{{ lng }}, lat:{{ lat }}
      <br/>
      address:{{ address }}
    </div>
    <div>
      内容：<input type="text" v-model="content">
      标签：<input type="text" v-model="tag">
      图片：<input type="file" @change="selectFile" accept="image/*">
      <button @click="addFootprint">提交</button>
    </div>
  </xe-container>
</template>

<script>
import * as api from '@/api'
import axios from 'axios'

export default {
  data() {
    return {
      footprintInfo: {},
      lng: '',
      lat: '',
      address: '',
      image: '',
      tag: '',
      content: ''
    }
  },
  methods: {
    selectFile(e) {
      this.image = e.target.files[0]
    },
    getFootprintList() {
      api.footprintList({
        longitude: this.lng, //120.078576
        latitude: this.lat, //30.274975
      }).then(resp => {
        if (!resp.data || resp.data.length < 1) {
          this.$toast.info('没有足迹！')
          return
        }
        this.footprintInfo = resp.data
      })
    },
    addFootprint() {
      if (this.lng < 0 || this.lat < 0 || !this.address) {
        this.$toast.error('定位失败！')
        return;
      }
      if (!this.content) {
        this.$toast.info('说点什么吧！')
        return;
      }

      let data = new FormData();
      data.append('longitude', this.lng)
      data.append('latitude', this.lat)
      data.append('address', this.address)
      data.append('tag', this.tag)
      data.append('content', this.content)
      if (this.image) {
        data.append('image', this.image)
      }
      api.addFootprint(data).then(resp => {
        if (resp.code === 200) {
          this.$toast.success('Yeah~ 到此一游！')
          return
        }

        this.$toast.error(resp.message);
      })
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            poi => {
              this.lng = poi.coords.longitude
              this.lat = poi.coords.latitude
              if (this.lng > 0 && this.lat > 0) {
                this.getAddress(this.lng, this.lat)
                this.getFootprintList()
              } else {
                this.$toast.error("定位失败！")
              }
            },
            error => {
              console.log(error)
              let msg = '定位失败！'
              switch (error.code) {
                case error.POSITION_UNAVAILABLE:
                  msg = '无法获取您的位置信息！'
                  break
                case error.PERMISSION_DENIED:
                  msg = '没有定位权限！'
                  break
                case error.TIMEOUT:
                  msg = '获取位置信息超时！'
                  break
              }
              this.$toast.error(msg, 6000)
            },
            {
              maximumAge: 15000,
              timeout: 10000,
              enableHighAccuracy: true
            }
        )
      } else {
        this.$toast.error("不支持定位！", 0)
      }
    },
    getAddress(lng, lat) {
      axios.get('https://restapi.amap.com/v3/geocode/regeo', {
        params: {
          location: lng + ',' + lat,
          key: '164fdccf3c6a8341f23e5d903642391f'
        }
      }).then(resp => {
        console.log(resp)
        if (resp.data.info === 'OK') {
          this.address = resp.data.regeocode.formatted_address
          return
        }
        if (!this.address) {
          this.$toast.error("获取位置信息失败！")
        }
      }).catch(error => {
        console.log(error)
        this.$toast.error("获取位置信息失败！")
      })
    }
  },
  mounted() {
    this.getLocation()
  }
}
</script>

<style lang="less" scoped>

</style>