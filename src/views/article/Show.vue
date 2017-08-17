<template>
    <div id="load-show">
        <el-row :gutter="25">
            <el-col :span="10" :offset="5">
                <div class="article">
                    <p>{{article.title}}</p>
                    <div class="article-edit" v-if="auth.id == article.user.id ? true : false">
                        <router-link :to="{name: 'ArticleEdit', params: {slug: this.$route.params.slug}}">
                            <span style="padding-left: 10px; font-size: larger"><i class="fa fa-edit"></i></span>
                        </router-link>
                    </div>
                    <div class="article-author">
                        <router-link  style="float: left" :to="{name: 'UserArticles', params: {slug: article.user.id}}">
                            <img :src="article.user.avatar" alt="">
                        </router-link>
                        <div class="article-author-detail">
                            <div>
                                <router-link :to="{name: 'UserArticles', params: {slug: article.user.id}}" id="btn-topic">
                                    作者
                                </router-link>
                                <span>{{article.user.name}}</span>
                            </div>
                            <div class="article-detail">
                                <span>创作于 {{ article.created_at }}</span>
                                <span>阅读 {{ article.view_count }}</span>
                                <span>评论 {{ article.comments_count }}</span>
                                <span>点赞 {{ article.likes_count }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="article-body">
                        <vue-markdown>{{article.body}}</vue-markdown>
                    </div>
                    <div class="article-like">
                        <button type="submit" id="btn-like" @click.prevent="click_like()">
                            <span v-if="!like"><i class="fa fa-thumbs-o-up"></i> 点赞 </span>
                            <span v-if="like"><i class="fa fa-thumbs-up"></i> 已赞 </span>
                            <span style="padding: 0 4px 0 4px"> | </span> {{article.likes_count}}
                        </button>
                    </div>
                    <div class="article-comment">
                        <img :src="auth.check() ? auth.user.avatar : article.user.avatar" alt="">
                        <form action="">
                            <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入评论内容"
                                    v-model="comment">
                            </el-input>
                            <button>评 论</button>
                        </form>
                    </div>
                    <div style="clear: both">
                        <h4>{{article.comments_count ? article.comments_count + ' 条' : '暂无'}}评论</h4>
                    </div>
                    <div style="border-bottom: 1px solid #eee; padding-top: 20px"></div>
                    <div>

                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="sidebar-author">
                    <p>作者： {{article.user.name}}</p>
                    <div style="border-bottom: 1px solid #eee; padding-top: 0px"></div>
                    <img :src="article.user.avatar" alt="">
                    <el-row>
                        <el-col :span="8">
                            <h2>{{article.user.followers_count}}</h2>
                            <p>关注者</p>
                        </el-col>
                        <el-col :span="8">
                            <h2>{{article.user.comments_count}}</h2>
                            <p>评论</p>
                        </el-col>
                        <el-col :span="8">
                            <h2>{{article.user.articles_count}}</h2>
                            <p>文章</p>
                        </el-col>
                    </el-row>
                    <el-button class="btn-define" @click.prevent="click_follow()">
                        <span v-if="!follow"><i class="fa fa-plus"></i> 关注 Ta </span>
                        <span v-if="follow"><i class="fa fa-minus"></i> 已关注 </span>
                    </el-button>
                </div>
                <hot-topics></hot-topics>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import api from '../../api'
  import VueMarkdown from 'vue-markdown'
  import { mapState } from 'vuex'
  import { Loading } from 'element-ui'
  import HotTopics from '../../components/HotTopics'

  export default {
    components: {
      HotTopics,
      VueMarkdown
    },
    data() {
      return {
        article: '',
        like: false,
        follow: false,
        comment: ''
      }
    },
    computed: mapState({
      auth: state => state.account.auth,
    }),
    mounted() {
      let options = {
        target: document.querySelector('#app')
      };
      let loadingInstance = Loading.service(options);
      api.get_article(this.$route.params.slug).then((res) => {
        if (res.data.status == 1) {
          this.article = res.data.data;
          api.is_follow_or_not(this.article.user.id).then((res) => {
            if (res.data.status == 1) {
              this.follow = res.data.data.followed;
            }
          });
          loadingInstance.close();
        }
      });
      api.is_like_or_not(this.$route.params.slug).then((res) => {
        if (res.data.status == 1) {
          this.like = res.data.data.liked;
        }
      });
    },
    methods: {
      click_like() {
        api.like(this.$route.params.slug).then((res) => {
          if (res.data.status == 1) {
            this.like = res.data.data.liked;
          }
        });
      },
      click_follow() {
        api.follow(this.article.user.id).then((res) => {
          if (res.data.status == 1) {
            this.follow = res.data.data.followed;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
    .article {
        margin-top: 40px;
        p {
            font-size: 30px;
            font-weight: bold;
            float: left;
        }
        a {
            color: tomato;
        }
        .article-edit {
            padding-top: 5px;
        }
    }
    .article-author {
        clear: both;
        margin-top: 30px;
        position: relative;
        img {
            position: absolute;
            width: 48px;
            border: 1px solid #aaa;
            border-radius: 100px;
            margin-top: 5px;
        }
        .article-author-detail {
            padding-top: 8px;
            padding-left: 65px;
            .article-detail {
                padding-top: 6px;
                color: #999;
                font-size: 13px;
                span {
                    padding-right: 5px;
                }
            }
        }
    }
    .article-body {
        padding-top: 50px;
        line-height: 25px;
    }
    #btn-topic {
        border-radius: 4px;
        font-size: 13px;
        border: 1px solid orangered;
        padding: 2px 2px 2px 5px;
        margin-right: 12px;
        font-weight: 500;
        color: orangered;
    }
    .article-like {
        padding-top: 70px;
        #btn-like {
            background-color: #fff;
            color: tomato;
            font-size: 18px;
            padding: 8px 20px 8px 20px;
            border-radius: 100px;
            box-shadow: none;
            border: 1px solid tomato;
            cursor: pointer;
        }
        #btn-like:hover,
        #btn-like:focus,
        #btn-like:active:focus,
        #btn-like:active {
            border-radius: 100px;
            color: #fff;
            box-shadow: none;
            background-color: tomato;
        }
    }
    .article-comment {
        padding-top: 30px;
        img {
            position: absolute;
            width: 36px;
            border: 1px solid #aaa;
            border-radius: 100px;
            margin-top: 5px;
        }
        form {
            padding-top: 8px;
            padding-left: 55px;
            button {
                margin-top: 15px;
                margin-bottom: 20px;
                float: right;
                background-color: #00b5ad;
                color: #fff;
                font-size: 17px;
                padding: 2px 15px 3px 15px;
                border-radius: 100px;
                box-shadow: none;
                border: 1px solid #00b5ad;
                &:hover {
                    color: tomato;
                    box-shadow: none;
                    background-color: #fff;
                    border: 1px solid tomato;
                }
            }
        }
    }
    .sidebar-author {
        text-align: center;
        margin-top: 40px;
        border: 1px solid #ddd;
        border-radius: 4px;
        p {
            padding: 8px 0 8px 0;
            font-size: 15px;
        }
        img {
            width: 100px;
            border: 1px solid #aaa;
            border-radius: 100px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        h2 {
            color: #00b5ad;
        }
    }
    .btn-define {
        width: 90%;
        margin: 15px 0 15px;
        background-color: #00b5ad;
        border-radius: 5px;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        border-color: #f1f1f1;
        box-shadow: none;
    }
    .btn-define:hover,
    .btn-define:active {
        background-color: #169e98;
        box-shadow: none;
    }
</style>