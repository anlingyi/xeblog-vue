<template>
    <xe-container>
        <div class="footprint">
            <div class="head">
        <span class="address">
          <i class="fa fa-map-marker" aria-hidden="true"></i> {{ positioning }}
          <i class="fa fa-refresh" aria-hidden="true" v-show="showRefresh" @click="getLocation"
             style="cursor: pointer"></i>
        </span>
            </div>
            <div class="statistics">
                Total: {<span>{{ footprintInfo.total }}</span>}
                <img src="../../assets/images/footprint.png"/>
                LBS: {<span>{{ footprintInfo.currentTotal }}</span>}
            </div>
            <div class="list">
                <div class="info" v-for="footprint in footprintInfo.footprintList" :key="footprint.id">
                    <div class="top">
                        <div class="address" :title="footprint.address">
                            <i class="fa fa-location-arrow" aria-hidden="true"></i> {{
                                covertAddress(footprint.address)
                            }}
                        </div>
                        <div class="distance">{{ footprint.distance }}M</div>
                    </div>
                    <div class="body">
                        <div class="content">
                            {{ footprint.content }} <span class="by">By.<span class="nickname">{{
                                footprint.nickname
                            }}</span></span>
                        </div>
                        <div class="image" v-if="footprint.image">
                            <img :src="footprint.image"/>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="date" v-text="footprint.createTime"></div>
                        <div class="tag" v-if="footprint.tag">
                            <span v-text="footprint.tag"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="foot" v-show="showFootBtn" @click="() => this.showFootBtn = false">
                <img src="../../assets/images/foot.png">
            </div>
            <div class="add" v-show="!showFootBtn">
                <div class="form">
                    <div>昵称：<input type="text" v-model="nickname"></div>
                    <div>内容：<input type="text" v-model="content"></div>
                    <div>标签：<input type="text" v-model="tag"></div>
                    <div>图片：<input type="file" @change="selectFile" accept="image/*"></div>
                </div>
                <button @click="() => this.showFootBtn = true">不了</button>
                <button @click="addFootprint">到此一游</button>
            </div>
        </div>
    </xe-container>
</template>

<script>
import * as api from '@/api'

export default {
    data() {
        return {
            footprintInfo: {
                footprintList: [],
                total: 0,
                currentTotal: 0
            },
            lng: '',
            lat: '',
            address: '',
            image: '',
            tag: '',
            content: '',
            nickname: '',
            positioning: '',
            showRefresh: false,
            showFootBtn: true
        }
    },
    methods: {
        selectFile(e) {
            this.image = e.target.files[0]
        },
        getFootprintList() {
            api.footprintList({
                longitude: this.lng,
                latitude: this.lat,
            }).then(resp => {
                if (!resp.data || resp.data.length < 1) {
                    this.$toast.info('没有足迹！')
                    return
                }
                this.footprintInfo = resp.data
            })
        },
        addFootprint() {
            this.showFootBtn = false;
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
            data.append('nickname', this.nickname)
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
            this.showRefresh = false
            this.positioning = '定位中...'
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                        poi => {
                            this.lng = poi.coords.longitude
                            this.lat = poi.coords.latitude
                            if (this.lng > 0 && this.lat > 0) {
                                this.getAddress(this.lng, this.lat)
                                this.getFootprintList()
                            } else {
                                this.positioning = '定位失败！'
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
                            this.positioning = '定位失败！'
                            this.showRefresh = true
                            this.$toast.error(msg, 6000)
                        },
                        {
                            maximumAge: 0,
                            timeout: 10000,
                            enableHighAccuracy: true
                        }
                )
            } else {
                this.$toast.error("不支持定位！", 0)
                this.positioning = '定位失败！'
                this.showRefresh = true
            }
        },
        getAddress(lng, lat) {
            api.regeo({
                location: this.gpsToAMap(lng, lat)
            }).then(resp => {
                if (resp.info === 'OK') {
                    this.address = resp.regeocode.formatted_address
                }
                if (!this.address) {
                    this.$toast.error("获取位置信息失败！")
                    this.positioning = '定位失败！'
                }
                this.positioning = this.covertAddress(this.address)
                this.showRefresh = true
            }).catch(error => {
                console.log(error)
                this.$toast.error("获取位置信息失败！")
                this.positioning = '定位失败！'
                this.showRefresh = true
            })
        },
        gpsToAMap(lng, lat) {
            const PI = 3.1415926535897932384626
            const a = 6378245.0
            const ee = 0.00669342162296594323

            function transfLng(lng, lat) {
                let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
                ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
                ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0
                ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0
                return ret
            }

            function transfLat(lng, lat) {
                let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
                ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
                ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
                ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0
                return ret
            }

            function notInChina(lng, lat) {
                return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false)
            }

            if (notInChina(lng, lat)) {
                return lng + ',' + lat
            }

            let dLat = transfLat(lng - 105.0, lat - 35.0)
            let dLng = transfLng(lng - 105.0, lat - 35.0)
            let radLat = lat / 180.0 * PI
            let magic = 1 - ee * Math.pow(Math.sin(radLat), 2)
            let sqrtMagic = Math.sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI)
            dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI)
            let mgLat = lat + dLat
            let mgLng = lng + dLng
            return mgLng + ',' + mgLat
        },
        covertAddress(address) {
            const strs = ['镇', '县', '区', '市', '省']
            let len = address.length - 1
            let start = -1
            for (let i in strs) {
                start = address.lastIndexOf(strs[i])
                if (start > -1 && start < len) {
                    break
                }
            }
            return address.substring(start + 1)
        }
    },
    mounted() {
        this.getLocation()
    }
}
</script>