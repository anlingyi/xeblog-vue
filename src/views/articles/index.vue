<template>
    <xe-container ref="xeContainer">
        <div class="posts" @click="() => {this.showToc = false}">
            <h2 class="article-title" v-text="articleInfo.title">
            </h2>
            <div class="article-mark">
              <i class="fa fa-calendar-check-o"></i>&nbsp;<span class="article-send-time"
                                                                v-text="articleInfo.createTime"></span>
              <span class="article-seg">｜</span>
              <i class="fa fa-leaf"></i>&nbsp;<span class="article-category">
                <a :href="'/?categoryId=' + articleInfo.categoryId + '&categoryName=' + articleInfo.categoryName"
                   v-text="articleInfo.categoryName"></a>
                </span>
              <span class="article-seg">｜</span>
              <i class="fa fa-eye"></i>&nbsp;<span class="article-read-count"
                                                   v-text="articleInfo.pageviews.toLocaleString()"></span>
              <span class="article-seg">｜</span>
              <i class="fa fa-pencil"></i> <span class="article-word-count">{{
                articleInfo.wordCount.toLocaleString()
              }}字</span>
              <span v-if="articleInfo.top || articleInfo.isRcmd">&nbsp;<i class="fa fa-diamond"
                                                                          :title="articleInfo.top ? '置顶' : articleInfo.isRcmd ? '推荐' : ''"
                                                                          :style="{color: articleInfo.top ? '#45b7d9' : articleInfo.isRcmd ? '#d94568' : ''}"></i></span>
            </div>
            <div class="article-info markdown-body" v-html="articleInfo.content">
            </div>
            <div class="subscribe">
                <button @click="() => {this.$refs.xeContainer.subscribe()}"><i class="fa fa-feed"></i> 订阅博主</button>
            </div>
            <div class="tags">
                <a :href="'/?tag=' + tag" v-for="tag in articleInfo.tags" :key="tag"><span><i class="fa fa-tag"></i>&nbsp;{{ tag }}</span></a>
            </div>
            <div class="share">
                <i>“ 爱分享的人，运气不会太差！” — 沃·兹基硕德</i>
                <div class="share-body"></div>
            </div>
            <div class="copyright">
                <ul class="post-copyright">
                    <li class="post-copyright-author">
                        <strong>更新时间：</strong>
                        <span v-text="articleInfo.updateTime"></span>
                    </li>
                    <li class="post-copyright-author">
                        <strong>本文作者：</strong>
                        <span v-text="articleInfo.author"></span>
                    </li>
                    <li class="post-copyright-link">
                        <strong>本文链接：</strong>
                        <a :href="currentUrl" target="_blank">{{ currentUrl }}</a>
                    </li>
                    <li class="post-copyright-license">
                        <strong>版权声明：</strong>
                        <span>本文章内容纯属作者个人观点，仅供参考，如需转载，请注明出处！</span>
                    </li>
                </ul>
            </div>
            <div class="nav">
              <div class="previous">
                <a :href="previous.id ? '/articles/' + previous.id : 'javascript:;'"><i
                    class="fa fa-chevron-left"></i>{{ previous.title ? previous.title : '没有了' }}</a>
              </div>
              <div class="next">
                <a :href="next.id ? '/articles/' + next.id : 'javascript:;'">{{ next.title ? next.title : '没有了' }}<i
                    class="fa fa-chevron-right"></i></a>
              </div>
              <div style="clear:both;"></div>
            </div>
          <div>
            <xe-recommend/>
          </div>
          <div id="lv-container" :data-uid="livereUid" :data-id="livereId"></div>
        </div>
        <div class="toc" v-show="showToc">
            <div ref="tocNav"></div>
        </div>
        <div class="toc-btn" title="目录" @click="displayToc"><a href="javascript:;"><i class="fa fa-book"></i></a></div>
    </xe-container>
</template>

<script>
    import '@/assets/lib/social-share/js/social-share.min.js'
    import * as api from '@/api'
    import MarkDownIt from 'markdown-it'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/dracula.css'

    export default {
        data() {
            return {
                articleInfo: {
                    id: '',
                  title: '',
                  categoryName: '',
                  tags: [],
                  pageviews: '',
                  author: '',
                  content: '',
                  createTime: '',
                  updateTime: '',
                  categoryId: '',
                  cover: '',
                  brief: '',
                  top: '',
                  wordCount: '',
                  isRcmd: ''
                },
                previous: {
                    id: '',
                    title: ''
                },
                next: {
                    id: '',
                    title: ''
                },
                showToc: false,
                currentUrl: 'https://' + process.env.VUE_APP_DOMAIN + '/articles/' + this.$route.params.id,
                livereId: 'city', // 来必力id
                livereUid: 'MTAyMC80MzA2MC8xOTYwNg==' // 来必力uid
            }
        },
        mounted() {
            this.getArticleInfo()
        },
        methods: {
            getArticleInfo() {
                api.articleInfo(this.$route.params.id).then(resp => {
                    const data = resp.data
                    if (!data || !data.articleDetailsDTO) {
                        this.$router.push({
                            path: '/404'
                        })
                        return
                    }

                    const articleData = data.articleDetailsDTO
                    document.title = document.title.replace('xeblog', articleData.title)

                    this.articleInfo = {
                      id: articleData.id,
                      title: articleData.title,
                      categoryName: articleData.categoryName,
                      tags: articleData.tag ? articleData.tag.split(',') : [],
                      pageviews: articleData.pageviews,
                      author: articleData.author,
                      createTime: articleData.createTime,
                      updateTime: articleData.updateTime,
                      categoryId: articleData.categoryId,
                      cover: articleData.cover,
                      brief: articleData.brief,
                      top: articleData.top,
                      wordCount: articleData.wordCount,
                      isRcmd: articleData.isRcmd
                    }

                    let md = new MarkDownIt({
                        html: true,
                        highlight: (str, lang) => {
                            if (lang && hljs.getLanguage(lang)) {
                                return '<pre class="hljs">' + hljs.highlight(lang, str).value + '</pre>'
                            }
                            return ''
                        }
                    })

                    md.use(require('markdown-it-anchor').default, {
                        permalinkClass: 'anchor',
                        permalink: true,
                        permalinkBefore: true,
                        permalinkSymbol: '§',
                    })
                    md.use(require('markdown-it-toc-done-right').default, {
                        callback: html => this.$refs.tocNav.innerHTML = html
                    })

                    md.renderer.rules.image = (tokens, idx, options, env, self) => {
                        let token = tokens[idx]
                        token.attrs[token.attrIndex('alt')][1] = self.renderInlineAsText(token.children, options, env);
                        let result = self.renderToken(tokens, idx, options)
                        return '<div class="article-info-image">' + result + '</div>';
                    }

                    this.articleInfo.content = md.render(articleData.content)

                    const desc = this.articleInfo.brief ? this.articleInfo.brief : this.articleInfo.content
                  const config = {
                    sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban', 'facebook', 'twitter'],
                    title: document.title,
                    description: desc.replace(/<.*?>\s*/g, "").substring(0, 120),
                    image: this.articleInfo.cover,
                    source: this.currentUrl,
                    url: this.currentUrl
                  }
                    socialShare('.share-body', config)

                    if (data.previous) {
                        this.previous = data.previous
                    }
                    if (data.next) {
                        this.next = data.next
                    }

                    this.livereComments()
                })
            },
            livereComments() {
                window.livereOptions = {
                    refer: this.currentUrl.replace('https://', '')
                };

                (function (d, s) {
                    let j, e = d.getElementsByTagName(s)[0]

                    if (typeof LivereTower === 'function') {
                        return
                    }

                    j = d.createElement(s)
                    j.src = 'https://cdn-city.livere.com/js/embed.dist.js'
                    j.async = true

                    e.parentNode.insertBefore(j, e)
                })(document, 'script')
            },
            displayToc() {
                this.showToc = !this.showToc
            }
        }
    }
</script>

<style scoped>
    @import '../../assets/lib/social-share/css/share.min.css';
    @import '../../assets/lib/markdown-theme/GitHub.css';
</style>
