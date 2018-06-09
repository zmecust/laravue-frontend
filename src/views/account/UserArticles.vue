<template>
  <div class="user-articles">
    <div v-if="articles" v-for="(article, index) in articles">
      <div class="user-article">
        <router-link :to="{ name: 'ArticleShow', params: { slug: article.id } }">
          <span>{{ article.title }}</span>
        </router-link>
        <span class="dex"> · {{ article.comments_count }} 条回复 ·</span>
        <span class="dex">{{ article.likes_count }} 人关注 ·</span>
        <span class="dex">创建于 {{ article.created_at.split(' ')[0] }}</span>
      </div>
      <div style="border-bottom: 1px solid #eee; padding-top: 10px"></div>
    </div>
    <div v-if="! articles">
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
      articles: ''
    }
  },
  mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      const res = await api.user_get_articles(this.$route.params.slug);
      if (res.data.status == 1) {
        if (res.data.data.length) {
          this.articles = res.data.data;
        }
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
.user-articles {
  margin-top: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 0 10px;
  .user-article {
    padding: 10px 10px 0 20px;
    a {
      font-size: 15px;
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