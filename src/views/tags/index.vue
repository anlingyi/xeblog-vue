<template>
    <xe-container ref="xeContainer">
        <div id="tag-cloud"></div>
    </xe-container>
</template>

<script>
import * as api from '@/api'
import $ from '@/assets/lib/tag-cloud/js/jquery-2.1.1.min.js'

window.$ = $
window.jQuery = $
require('@/assets/lib/tag-cloud/js/jquery.svg3dtagcloud.min.js')

export default {
    methods: {
        init() {
            api.tagList().then(resp => {
                if (!resp.data || resp.data.length < 1) {
                    this.$toast.info('没有标签！', 0)
                    return
                }

                let tags = []
                const data = resp.data
                for (let i in data) {
                    const tag = data[i]
                    tags.push({
                        label: tag.name,
                        title: '该标签下共有' + tag.articleCount + '篇文章！',
                        url: '/?tag=' + tag.name
                    })
                }

                let tagCloud = document.getElementById('tag-cloud')
                if (!tagCloud) {
                    setTimeout(this.init, 50)
                    return
                }
                let width = tagCloud.offsetWidth
                let height = tagCloud.offsetHeight
                if (width > 1000) {
                    width = '680'
                }
                const settings = {
                    width: width,
                    height: height,
                    entries: tags,
                    radius: '75%',
                    radiusMin: 100,
                    bgDraw: true,
                    bgColor: '#fff',
                    opacityOver: 1,
                    opacityOut: 0.3,
                    opacitySpeed: 6,
                    fov: 800,
                    speed: 0.3,
                    fontFamily: 'Oswald, Arial, sans-serif',
                    fontSize: '16',
                    fontColor: '#000',
                    fontWeight: 'normal',//bold
                    fontStyle: 'italic',//italic
                    fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
                    fontToUpperCase: false
                }
                $('#tag-cloud').svg3DTagCloud(settings)
                let svg = tagCloud.firstChild
                svg.setAttribute('viewBox', '0,0,' + width + ',' + height + '')
            })
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<link rel="stylesheet" type="text/css" href="@/assets/lib/tag-cloud/css/tags-cloud.css"/>
<style lang="less" scoped>
#tag-cloud {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    text-align: center;
}
</style>