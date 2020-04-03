<template>
    <xe-container>
        <div id="tag-cloud"></div>
    </xe-container>
</template>

<script>
    import $ from '@/assets/lib/tag-cloud/js/jquery-2.1.1.min.js'

    window.$ = $
    window.jQuery = $
    require('@/assets/lib/tag-cloud/js/jquery.svg3dtagcloud.min.js')

    export default {
        data() {
            return {
                tags: [
                    {
                        label: 'Java',
                        title: 'Java',
                        url: 'https://xeblog.cn'
                    },
                    {
                        label: 'Spring',
                        title: 'Spring',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'C++',
                        title: 'C++',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'Vue',
                        title: 'Vue',
                        url: 'xeblog.cn'
                    },
                    {
                        label: '测试',
                        title: '测试',
                        url: 'xeblog.cn'
                    },
                    {
                        label: '测试111',
                        title: '测试111',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'Java',
                        title: 'Java',
                        url: 'https://xeblog.cn'
                    },
                    {
                        label: 'Spring',
                        title: 'Spring',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'C++',
                        title: 'C++',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'Vue',
                        title: 'Vue',
                        url: 'xeblog.cn'
                    },
                    {
                        label: '测试',
                        title: '测试',
                        url: 'xeblog.cn'
                    },
                    {
                        label: '测试111',
                        title: '测试111',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'Java',
                        title: 'Java',
                        url: 'https://xeblog.cn'
                    },
                    {
                        label: 'Spring',
                        title: 'Spring',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'C++',
                        title: 'C++',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'Vue',
                        title: 'Vue',
                        url: 'xeblog.cn'
                    },
                    {
                        label: '测试',
                        title: '测试',
                        url: 'xeblog.cn'
                    },
                    {
                        label: '测试111',
                        title: '测试111',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'Java',
                        title: 'Java',
                        url: 'https://xeblog.cn'
                    },
                    {
                        label: 'Spring',
                        title: 'Spring',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'C++',
                        title: 'C++',
                        url: 'xeblog.cn'
                    },
                    {
                        label: 'Vue',
                        title: 'Vue',
                        url: 'xeblog.cn'
                    },
                    {
                        label: '测试',
                        title: '测试',
                        url: 'xeblog.cn'
                    },
                    {
                        label: '测试111',
                        title: '测试111',
                        url: 'xeblog.cn'
                    }
                ]
            }
        },
        methods: {
            init() {
                let tagCloud = document.getElementById('tag-cloud')
                let width = tagCloud.offsetWidth
                let height = tagCloud.offsetHeight
                if (width > 1000) {
                    width = '680'
                }
                const settings = {
                    width: width,
                    height: height,
                    entries: this.tags,
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
            }
        },
        updated() {
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