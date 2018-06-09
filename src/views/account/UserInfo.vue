<template>
  <div id="load-show">
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <el-col :span="7">
        <div class="sidebar-author">
          <p>作者： {{ user.name }}</p>
          <div style="border-bottom: 1px solid #eee; padding-top: 0px"></div>
          <img :src="user.avatar" alt="">
          <el-row>
            <el-col :span="8">
              <h2>{{ user.followers_count }}</h2>
              <p>关注者</p>
            </el-col>
            <el-col :span="8">
              <h2>{{ user.comments_count }}</h2>
              <p>评论</p>
            </el-col>
            <el-col :span="8">
              <h2>{{ user.articles_count }}</h2>
              <p>文章</p>
            </el-col>
          </el-row>
          <dl class="dl-horizontal">
            <div class="df">
              <dt>
                <label>Name:</label>
              </dt>
              <dd>
                <strong>{{ user.name }}</strong>
              </dd>
            </div>
            <div class="df" v-if="user.real_name">
              <dt>
                <label>Real Name:</label>
              </dt>
              <dd>
                <span>{{ user.real_name }}</span>
              </dd>
            </div>
            <div class="df" v-if="user.city">
              <dt>
                <label>City:</label>
              </dt>
              <dd>
                <span>
                  <i class="text-md fa fa-map-marker"></i> {{ user.city }}</span>
              </dd>
            </div>
            <div class="df">
              <dt>
                <label>最近访问:</label>
              </dt>
              <dd>
                <span style="line-height: 24px; font-size: 15px">{{ user.last_actived_at }}</span>
              </dd>
            </div>
          </dl>
          <div v-if="auth.id !== user.id">
            <el-button class="btn-define" @click.prevent="click_follow()">
              <span v-if="!follow">
                <i class="fa fa-plus"></i> 关注 Ta </span>
              <span v-if="follow">
                <i class="fa fa-minus"></i> 已关注 </span>
            </el-button>
            <el-button class="btn-define" style="margin-top: 0" @click.prevent="send_message()">
              <span>
                <i class="fa fa-envelope-o"></i> 发送私信 </span>
            </el-button>
          </div>
          <div v-if="auth.id == user.id">
            <el-button class="btn-define" @click.prevent="edit_user_info()">
              <span>
                <i class="fa fa-plus"></i> 编辑个人资料 </span>
            </el-button>
          </div>
        </div>
        <div class="user-info">
          <ul class="reply">
            <li>
              <router-link :to="{name: 'UserArticles', params: {slug: user.id}}">
                <i class="text-md fa fa-list-ul"></i> Ta 发布的话题
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'UserReplies', params: {slug: user.id}}">
                <i class="text-md fa fa-comment"></i> Ta 发表的回复
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'UserLikesUsers', params: {slug: user.id}}">
                <i class="text-md fa fa-eye"></i> Ta 关注的用户
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'UserLikesArticles', params: {slug: user.id}}">
                <i class="text-md fa fa-thumbs-up"></i> Ta 赞过的话题
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="17">
        <router-view></router-view>
      </el-col>
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
    </el-row>
  </div>
</template>

<script>
import api from '../../api';
import { mapState } from 'vuex';
import Popup from '../../components/Popup'

export default {
  data() {
    return {
      user: '',
      follow: false,
      showPreview: false,
      showDialog: false,
      content: '',
    }
  },
  components: {
    Popup
  },
  computed: mapState({
    auth: state => state.account.auth,
  }),
  mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      const res = await api.get_user(this.$route.params.slug);
      this.user = res.data.data;
      if (this.auth.check()) {
        const is_follow_or_not = await api.is_follow_or_not(this.user.id);
        if (is_follow_or_not.data.status) {
          this.follow = is_follow_or_not.data.data.followed;
        }
      }
    },
    async click_follow() {
      if (this.auth.check()) {
        const res = await api.follow(this.user.id);
        if (res.data.status == 1) {
          this.follow = res.data.data.followed;
          this.message();
        }
      } else {
        this.showPreview = true;
      }
    },
    edit_user_info() {
      this.$router.push({ name: 'EditUserInfo', params: { slug: this.auth.id } });
    },
    closePreview() {
      this.showPreview = false;
    },
    closeDialog() {
      this.showDialog = false;
    },
    send_message() {
      this.showDialog = true;
    },
    async submitDialog() {
      const res = await api.send_message({ content: this.content, user_id: this.auth.id });
      if (res.data.status) {
        this.showDialog = false;
      }
    },
    message() {
      if (this.follow) {
        this.$message({
          message: '已关注',
          type: 'success'
        });
      } else {
        this.$message({
          message: '已取消关注',
          type: 'success'
        });
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
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
  .dl-horizontal {
    position: relative;
    margin-top: 10px;
    border-top: 1px solid #eee;
    padding: 8px 0;
    .df {
      clear: both;
      padding-top: 15px;
      dt {
        color: #999;
        width: 35%;
        text-align: right;
        float: left;
        font-size: 15px;
      }
      dd {
        width: 60%;
        text-align: left;
        padding-left: 40%;
        color: #333;
      }
    }
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

.user-info {
  text-align: center;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  ul {
    padding: 10px 0 10px;
    li {
      list-style: none;
      padding: 12px 0 12px;
      border-bottom: 1px solid #eee;
      a {
        color: #333;
        font-size: 14px;
      }
      .router-link-active {
        color: #00b5ad;
      }
    }
  }
}
</style>