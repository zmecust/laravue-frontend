<template>
  <div>
    <div class="hot-topics">
      <p>热门话题</p>
      <div style="border-bottom: 1px solid #eee;"></div>
      <ul v-for="article in articles">
        <router-link :to="{name: 'ArticleShow', params: {slug: article.id}}">
          <li>• &nbsp;{{ article.title }}</li>
        </router-link>
      </ul>
    </div>
    <div class="hot-tags">
      <p>热门标签</p>
      <div style="border-bottom: 1px solid #eee; padding-top: 0px"></div>
      <div class="tag" v-for="tag in tags">
        <router-link :to="{name: 'ArticleIndex', query: {tag: tag.name}}" id="btn-tag">
          {{ tag.name }}
        </router-link>
      </div>
      <div style="clear: both; margin-bottom: 15px"></div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      articles: '',
      tags: ''
    }
  },
  async mounted() {
    const [ hot_articles, hot_tags ] = await Promise.all([
      api.hot_articles(),
      api.hot_tags()
    ]); ;
    if (hot_articles.data.status === 1) {
      this.articles = hot_articles.data.data;
    }
    if (hot_tags.data.status === 1) {
      this.tags = hot_tags.data.data;
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-topics {
  text-align: center;
  margin-top: 20px;
  padding-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  p {
    padding: 8px 0 8px 0;
    font-size: 15px;
  }
  li {
    font-size: 14px;
    text-align: left;
    padding: 10px 10px 0 0;
    margin-left: 15px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  a {
    color: #333;
    &:hover {
      color: #00b5ad;
    }
  }
}

.hot-tags {
  text-align: center;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  p {
    padding: 8px 0 8px 0;
    font-size: 15px;
  }
  .tag {
    text-align: left;
    margin: 10px 5px 10px 10px;
  }
}

#btn-tag {
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid #eee;
  padding: 5px 7px 5px;
  font-weight: 500;
  background-color: #eee;
  color: #00b5ad;
  float: left;
  margin: 5px 5px;
  height: 17px;
}

#btn-tag:hover {
  color: orangered;
  background-color: #dedede;
  border-radius: 4px;
  border: 1px solid #dedede;
  box-shadow: none;
  text-decoration: none;
}
</style>