<template>
  <div class="comment">
    <div class="comment-author-detail" v-for="child_comment in child_comments">
      <div class="comment-detail">
        <router-link class="comment-body" :to="{ name: 'UserArticles', params: { slug: child_comment.user_id } }">
          {{ child_comment.user.name }}
        </router-link>
        <span style="float: left;">&nbsp; : &nbsp;</span>
        <router-link class="comment-name" :to="{ name: 'UserArticles', params: { slug: child_comment.parent_user_id } }">
          @{{ child_comment.parent_name }}
        </router-link>
        &nbsp;{{ child_comment.body }}
      </div>
      <div class="comment-time">
        <span>评论于 {{ child_comment.created_at }}</span>
        <span style="padding-left: 10px; cursor: pointer;">
          <a @click.present="show(child_comment.id)">
            <i class="fa fa-reply" aria-hidden="true"></i> 回复</a>
        </span>
      </div>
      <div style="border-bottom: 1px dashed #eee; padding-top: 15px; margin-bottom: 10px"></div>
    </div>
    <div class="add-comment">
      <a @click.present="show(childComment)">
        <i class="fa fa-pencil" aria-hidden="true"></i> 添加新评论</a>
      <form v-if="show_comment" action="">
        <el-input type="textarea" :rows="4" placeholder="请输入评论内容" v-model="comment">
        </el-input>
        <el-button type="submit" @click.prevent="submit">评 论</el-button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  props: ['childComment', 'article_id'],
  data() {
    return {
      child_comments: '',
      show_comment: false,
      comment: '',
      parent_id: this.childComment
    }
  },
  mounted() {
    this.get_comment();
  },
  methods: {
    async get_comment() {
      const res = await api.get_child_comment(this.article_id, this.childComment);
      if (res.data.status === 1) {
        this.child_comments = res.data.data
      }
    },
    async show(parent_id) {
      this.parent_id = parent_id;
      this.show_comment = !this.show_comment;
    },
    async submit() {
      const res = await api.create_comment({ article_id: this.article_id, parent_id: this.parent_id, body: this.comment });
      if (res.data.status === 1) {
        this.child_comments.push(res.data.data);
        this.comment = '';
        this.show_comment = !this.show_comment;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  margin: 10px 0 10px;
  padding: 5px 0 10px 15px;
  border-left: 2px solid #cdcdcd;
}

.comment-detail {
  line-height: 25px;
  font-size: 15px;
  .comment-body {
    float: left;
    padding-top: 0px;
    color: #00b5ad
  }
  .comment-name {
    float: left;
    padding-top: 0px;
    color: #00b5ad;
  }
}

.comment-time {
  padding-top: 8px;
  font-size: 13px;
  color: #999;
}

.add-comment {
  margin-top: 5px;
  a {
    cursor: pointer;
    color: #999;
    font-size: 14px;
  }
  form {
    margin: 10px 0 10px;
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
</style>