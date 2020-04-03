<template>
    <xe-container>
        <div class="posts">
            <h2 class="article-title">
                Java从入门到入土
            </h2>
            <div class="article-mark">
                <i class="fa fa-calendar-o"></i>&nbsp;<span class="article-send-time">2020/03/24</span>&nbsp;|
                <i class="fa fa-leaf"></i>&nbsp;<span class="article-category"><a href="#">记录</a></span>&nbsp;|
                <i class="fa fa-eye"></i>&nbsp;<span class="article-read-count">999</span>
            </div>
            <div class="article-info">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈红红火火恍恍惚惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈红红火火恍恍惚惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈红红火火恍恍惚惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈红红火火恍恍惚惚红红火火恍恍惚惚红红火火恍恍惚惚红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈
                <div class="article-info-image">
                    <img src="https://oss.xeblog.cn/prod/50fbe9e7f1a04295a67aa12542242d1c.png">
                </div>
                <div class="article-info-image">
                    <img src="https://oss.xeblog.cn/prod/50fbe9e7f1a04295a67aa12542242d1c.png">
                </div>
            </div>
            <div class="tags">
                <a href="#"><span><i class="fa fa-tag"></i>&nbsp;Java</span></a>
                <a href="#"><span><i class="fa fa-tag"></i>&nbsp;Spring</span></a>
                <a href="#"><span><i class="fa fa-tag"></i>&nbsp;测试</span></a>
            </div>
            <div class="share">
                <i>“ 爱分享的人，运气不会太差！” — 沃·兹基硕德</i>
                <div class="social-share" :data-sites="sites"></div>
            </div>
            <div class="copyright">
                <ul class="post-copyright">
                    <li class="post-copyright-author">
                        <strong>更新时间：</strong>
                        <span>2020/03/30</span>
                    </li>
                    <li class="post-copyright-author">
                        <strong>本文作者：</strong>
                        <span>AnLingYi</span>
                    </li>
                    <li class="post-copyright-link">
                        <strong>本文链接：</strong>
                        <a href="#" target="_blank">https://xeblog.cn</a>
                    </li>
                    <li class="post-copyright-license">
                        <strong>版权声明：</strong>
                        <span>本文章内容纯属作者个人观点，仅供参考，如需转载，请注明出处！</span>
                    </li>
                </ul>
            </div>
            <div class="nav">
                <div class="previous">
                    <a href="#"><i class="fa fa-chevron-left"></i>上一篇哈哈哈哈哈哈哈哈哈哈哈哈</a>
                </div>
                <div class="next">
                    <a href="#">哈哈哈哈哈哈哈哈哈哈哈哈下一篇<i class="fa fa-chevron-right"></i></a>
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>
    </xe-container>
</template>


<script>
    import '@/assets/lib/social-share/js/social-share.min.js'

    export default {
        data() {
            return {
                sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban', 'facebook', 'twitter']
            }
        }
    }
</script>

<style rel="stylesheet" type="text/css" src="@/assets/lib/social-share/css/share.min.css"></style>
<style scoped>
</style>