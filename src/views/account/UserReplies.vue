<template>
  <div class="user-articles">
    <div v-if="comments.length" v-for="(comment, index) in comments" :key="comment.id">
      <div class="user-article">
        <router-link :to="{name: 'ArticleShow', params: {slug: comment.commentable.id}}">
          <span style="font-size: 15px">{{ comment.commentable.title }}</span>
        </router-link>
        <span class="dex"> · {{ comment.commentable.comments_count }} 条回复 ·</span>
        <span class="dex">{{ comment.commentable.likes_count }} 人关注 ·</span>
        <span class="dex">评论于 {{ comment.created_at.split(' ')[0] }}</span>
        <p style="padding-top: 10px; font-size: 15px">{{ comment.body }}</p>
      </div>
      <div style="border-bottom: 1px solid #eee; padding-top: 8px"></div>
    </div>
    <div v-if="! comments.length">
      <div class="no-article">
        <p>没有任何数据~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api';

export default {
  data() {
    return {
      comments: ''
    }
  },
  mounted() {
    api.user_get_replies(this.$route.params.slug).then((res) => {
      if (res.data.status == 1) {
        this.comments = res.data.data;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.user-articles {
  margin-top: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 0 10px;
  .user-article {
    padding: 10px 10px 0 20px;
    a {
      color: #00b5ad;
      &:hover {
        color: tomato;
      }
    }
    .dex {
      color: #999;
      font-size: 14px;
    }
  }
  .no-article {
    text-align: center;
    p {
      margin: 30px 0 30px;
    }
  }
}
</style>