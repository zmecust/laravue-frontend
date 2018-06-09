<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="result">
          <div class="search">
            <h4 v-if="! articles.total">
              <i class="fa fa-search"></i> 未搜索到关于 “<span style="color: tomato">{{ name }}</span>” 任何结果
            </h4>
            <h4 v-else>
              <i class="fa fa-search"></i> 关于 “<span style="color: tomato">{{ name }}</span>” 的搜索结果, 共 {{ articles.total }} 条
            </h4>
          </div>
          <div style="border-bottom: 1px solid #eee; padding-top: 10px"></div>
          <div class="articles" v-for="article in articles.data" :key="article.id">
            <router-link :to="{name: 'ArticleShow', params: {slug: article.id}}">{{ article.title }}</router-link>
            <small>&nbsp; by</small>
            <router-link :to="{ name: 'UserArticles', params: { slug: article.user.id } }">
              <img class="avatar" alt="article.user.name" :src="article.user.avatar"/>
              <small>{{ article.user.name }}</small>
            </router-link>
            <p>{{ article.abstract }} ...</p>
            <div style="border-bottom: 1px solid #eee; padding-top: 20px"></div>
          </div>
          <div v-if="articles.total" style="text-align: right; margin-top: 20px">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="page_size" @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      articles: "",
      name: "",
      total: null,
      page_size: 30
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    handleCurrentChange(page) {
      this.get_articles(page);
    },
    reload() {
      this.name = this.$route.query.q;
      api.search(this.$route.query.q).then(res => {
        if (res.data.status) {
          this.articles = res.data.data;
          this.total = Number(res.data.data.total);
          for (let index in this.articles.data) {
            this.articles.data[index].abstract = this.articles.data[index].body
              .substring(0, 200)
              .replace(/<\/?.+?>/g, "")
              .replace(/ /g, "")
              .replace(/&nbsp;/g, " ")
              .replace(/#/g, "");
          }
        }
      });
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
.result {
  margin-top: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 20px 10px 20px;
  .search {
    color: #999;
    padding: 10px 0 10px;
  }
  .articles {
    .avatar {
      width: 24px;
      padding-top: 15px;
      border-radius: 24px;
    }
    p {
      padding-top: 10px;
      line-height: 25px;
      font-size: 15px;
      color: #555;
    }
    a {
      color: #444;
      font-weight: bolder;
      &:hover {
        color: tomato;
      }
    }
  }
}
</style>
