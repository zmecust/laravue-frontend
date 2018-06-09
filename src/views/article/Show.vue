<template>
  <div>
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <el-col :span="17">
        <div class="article">
          <p>{{ article.title }}</p>
          <div class="article-edit" v-if="auth.id == article.user.id ? true : false">
            <router-link :to="{ name: 'ArticleEdit', params: { slug: this.$route.params.slug } }">
              <span style="padding-left: 10px; font-size: larger">
                <i class="fa fa-edit"></i>
              </span>
            </router-link>
          </div>
          <div class="article-author">
            <router-link style="float: left" :to="{ name: 'UserArticles', params: { slug: article.user.id } }">
              <img :src="article.user.avatar" alt="">
            </router-link>
            <div class="article-author-detail">
              <div>
                <router-link :to="{ name: 'UserArticles', params: { slug: article.user.id } }" id="btn-topic">
                  作者
                </router-link>
                <span>{{ article.user.name }}</span>
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
            <div class="markdown-body" v-html="article.body"></div>
          </div>
          <div class="article-like">
            <el-button type="submit" id="btn-like" @click.prevent="click_like()">
              <span v-if="!like">
                <i class="fa fa-thumbs-o-up"></i> 点赞 </span>
              <span v-if="like">
                <i class="fa fa-thumbs-up"></i> 已赞 </span>
              <!--<span style="padding: 0 4px 0 4px"> | </span> {{article.likes_count}}-->
            </el-button>
            <div style="text-align: center">
              <div v-for="like in article_likes" :key="like.id" style="float: left; padding: 20px 5px 10px">
                <router-link :to="{ name: 'UserArticles', params: { slug: like.id } }">
                  <img :src="like.avatar" :alt="like.name" :title="like.name" class="likes-avatar">
                </router-link>
              </div>
            </div>
          </div>
          <div class="article-comment" v-if="auth.check()">
            <img :src="auth.user.avatar" alt="">
            <form action="">
              <el-input type="textarea" :rows="4" placeholder="请输入评论内容" v-model="comment">
              </el-input>
              <el-button type="submit" @click.prevent="submit">评 论</el-button>
            </form>
          </div>
          <div v-if="!auth.check()" class="article-login">
            <p>
              <router-link :to="{path: '/user/login', query: { redirect_url: this.$route.path }}">
                登录参与评论
              </router-link>
            </p>
          </div>
          <div style="clear: both">
            <h4>{{ article.comments_count ? article.comments_count + ' 条' : '暂无' }}评论</h4>
          </div>
          <div style="border-bottom: 1px solid #ddd; padding-top: 20px"></div>
          <div v-for="(comment, index) in comments">
            <div class="comment-author">
              <div style="float: left">
                <router-link :to="{name: 'UserArticles', params: {slug: comment.user.id}}">
                  <img :src="comment.user.avatar" alt="">
                </router-link>
              </div>
              <div class="comment-author-detail">
                <div>
                  <router-link style="padding-top: 1px; font-size: 16px; color: #555" :to="{ name: 'UserArticles', params: { slug: comment.user_id } }">
                    {{ comment.user.name }}&nbsp;
                  </router-link><br>
                  <span># {{ index + 1 }} · 评论于 {{ comment.created_at }}</span>
                </div>
              </div>
              <div class="comment-detail">
                {{ comment.body }}
              </div>
              <ChildComment :childComment="comment.id" :article_id="article.id"></ChildComment>
              <div style="border-bottom: 1px solid #eee; padding-top: 15px"></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="sidebar-author">
          <p>作者： {{ article.user.name }}</p>
          <div style="border-bottom: 1px solid #eee; padding-top: 0px"></div>
          <img :src="article.user.avatar" alt="">
          <el-row>
            <el-col :span="8">
              <h2>{{ article.user.followers_count }}</h2>
              <p>关注者</p>
            </el-col>
            <el-col :span="8">
              <h2>{{ article.user.comments_coun }}</h2>
              <p>评论</p>
            </el-col>
            <el-col :span="8">
              <h2>{{ article.user.articles_count }}</h2>
              <p>文章</p>
            </el-col>
          </el-row>
          <el-button class="btn-define" @click.prevent="click_follow()">
            <span v-if="!follow">
              <i class="fa fa-plus"></i> 关注 Ta </span>
            <span v-if="follow">
              <i class="fa fa-minus"></i> 已关注 </span>
          </el-button>
          <el-button class="btn-define" style="margin-top: 0" @click.prevent="send_message()">
            <span>
              <i class="fa fa-envelope-o"></i> 发送私信
            </span>
          </el-button>
        </div>
        <hot-topics></hot-topics>
      </el-col>
    </el-row>
    <popup v-show="showPreview" @closePreview="closePreview"></popup>
    <el-dialog title="发送私信" :visible.sync="showDialog" width="600px">
      <el-form label-position="left">
        <el-form-item label="内容：">
          <el-input v-model="content" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api";
import { mapState } from "vuex";
import { Loading } from "element-ui";
import HotTopics from "../../components/HotTopics";
import Popup from "../../components/Popup";
import ChildComment from "../../components/Comment";
import Marked from "marked";

export default {
  components: {
    HotTopics,
    Popup,
    ChildComment
  },
  data() {
    return {
      article: "",
      like: false,
      follow: false,
      comment: "",
      comments: "",
      showPreview: false,
      showDialog: false,
      content: '',
      article_likes: ''
    };
  },
  computed: mapState({
    auth: state => state.account.auth
  }),
  mounted() {
    Marked.setOptions({
      highlight: function(code) {
        return require("highlight.js").highlightAuto(code).value;
      }
    });
    this.reload();
  },
  methods: {
    async reload() {
      let options = {
        target: document.querySelector("#app")
      };
      let loadingInstance = Loading.service(options);
      const res = await api.get_article(this.$route.params.slug);
      if (res.data.status) {
        this.article = res.data.data;
        this.article.body = Marked(res.data.data.body);
        if (this.auth.check()) {
          const is_follow_or_not = await api.is_follow_or_not(this.article.user.id);
          if (is_follow_or_not.data.status) {
            this.follow = is_follow_or_not.data.data.followed;
          }
        }
        loadingInstance.close();
      }
      const [ get_article_likes, get_comments ] = await Promise.all([
        api.get_article_likes(this.$route.params.slug),
        api.get_comments(this.$route.params.slug)
      ]);
      if (get_article_likes.data.status) {
        this.article_likes = get_article_likes.data.data;
      }
      this.comments = get_comments.data.data;
      if (this.auth.check()) {
        const is_like_or_not = await api.is_like_or_not(this.$route.params.slug);
        if (is_like_or_not.data.status) {
          this.like = is_like_or_not.data.data.liked;
        }
      }
    },
    async click_like() {
      if (this.auth.check()) {
        const res = await api.like(this.$route.params.slug);
        if (res.data.status == 1) {
          if (res.data.data.liked) {
            this.article_likes.push(res.data.data);
          }
          this.like = res.data.data.liked;
        }
      } else {
        this.showPreview = true;
      }
    },
    async click_follow() {
      if (this.auth.check()) {
        const res = await api.follow(this.article.user.id);
        if (res.data.status == 1) {
          this.follow = res.data.data.followed;
          this.message();
        }
      } else {
        this.showPreview = true;
      }
    },
    async submit() {
      const res = await api.create_comment({
        article_id: this.article.id,
        parent_id: 0,
        body: this.comment
      });
      if (res.data.status == 1) {
        this.comments.push(res.data.data);
      }
    },
    send_message() {
      if (this.auth.check()) {
        this.showDialog = true;
      } else {
        this.showPreview = true;
      }
    },
    closeDialog() {
      this.showDialog = false;
    },
    async submitDialog() {
      const res = await api.send_message({ content: this.content, user_id: this.auth.id });
      if (res.data.status) {
        this.showDialog = false;
      }
    },
    closePreview() {
      this.showPreview = false;
    },
    message() {
      if (this.follow) {
        this.$message({
          message: "已关注",
          type: "default"
        });
      } else {
        this.$message({
          message: "已取消关注",
          type: "default"
        });
      }
    }
  },
  watch: {
    $route(to, from) {
      this.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../static/css/markdown.css";
@import "~highlight.js/styles/atom-one-light.css";
.article {
  margin-top: 40px;
  p {
    font-size: 30px;
    font-weight: bold;
    float: left;
    margin-bottom: 10px;
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
    padding-top: 10px;
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
  padding-top: 35px;
  line-height: 25px;
}

.comment-author {
  clear: both;
  margin-top: 15px;
  position: relative;
  img {
    position: absolute;
    width: 36px;
    border: 1px solid #aaa;
    border-radius: 100px;
    margin-top: 5px;
  }
  .comment-author-detail {
    padding-top: 6px;
    padding-left: 50px;
    color: #999;
    font-size: 13px;
  }
  .comment-detail {
    padding: 20px 0 10px;
    color: #555;
  }
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
  clear: both;
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
      padding: 5px 15px 5px 15px;
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

.article-login {
  margin: 100px 0 40px;
  padding-top: 40px;
  border: 1px dashed #00b5ad;
  width: 100%;
  height: 80px;
  border-radius: 4px;
  position: relative;
  a {
    position: absolute;
    font-size: smaller;
    left: 40%;
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
.likes-avatar {
  width: 40px;
  border: 1px solid #aaa;
  border-radius: 100px;
}
</style>