<template>
    <div id="load-index">
        <el-row :gutter="25">
            <el-col :span="10" :offset="5">
                <div style="border: 1px solid #fff;padding-top: 10px"></div>
                <div class="content" v-for="(article, index) in articles">
                    <div class="content-body">
                        <router-link class="content-title" :to="{name: 'ArticleShow', params: {slug: article.id}}">
                            <h3>{{article.title}}</h3>
                        </router-link>
                        <div style="padding-top: 5px; font-size: 13px; color: #bbb">由 <router-link :to="{name: 'UserArticles', params: {slug: article.user.id}}">{{article.user.name}}</router-link> 发表于 {{article.created_at}}</div>
                        <div class="content-body-body">
                            {{ article.abstract }} ...
                        </div>
                        <div style="padding-top: 15px">
                            <div v-for="tag in article.tags" style="float: left">
                                <router-link  v-if="tag"
                                              to="tags"
                                              id="btn-topic">
                                   # {{ tag.name }}
                                </router-link>
                            </div>
                            <div class="content-count">
                                <span style="padding-right: 4px"><i class="fa fa-eye"></i></span><span>{{ article.view_count }}</span>
                                <span style="padding-right: 4px; margin-left: 10px"><i class="fa fa-comments"></i></span><span>{{ article.comments_count }}</span>
                                <span style="padding-right: 4px; margin-left: 10px"><i class="fa fa-heart"></i></span><span>{{ article.likes_count }}</span>
                            </div>
                        </div>
                    </div>
                    <div style="border-bottom: 1px solid #ddd; padding-top: 50px"></div>
                </div>
            </el-col>
            <el-col :span="4" style="margin-top: 20px;">
                <hot-topics></hot-topics>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import api from '../../api'
  import { Loading } from 'element-ui';
  import HotTopics from '../../components/HotTopics'

  export default {
    data() {
      return {
        articles: '',
      }
    },
    components: {
      HotTopics
    },
    mounted() {
      let options = {
        target: document.querySelector('#app')
      };
      let loadingInstance = Loading.service(options);
      api.get_articles().then((res) => {
        if (res.data.status == 1) {
          this.articles = res.data.data.data;
          for (let index in this.articles) {
              this.articles[index].abstract = this.articles[index].body.substring(0, 150)
                      .replace(/<\/?.+?>/g, "").replace(/ /g, "").replace(/&nbsp;/g, ' ');
          }
          loadingInstance.close();
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
    .content-body {
        width: 90%;
        margin-top: 30px;
        a {
            color: #999;
            &:hover {
                color: #00b5ad;
            }
        }
        .content-title {
            color: #333;
            &:hover {
                color: #00b5ad;
                text-decoration: underline;
            }
        }
        .content-body-body {
            padding-top: 12px;
            line-height: 25px;
        }
    }
    .content-count {
        float: left;
        font-size: 14px;
        padding-top: 2px;
        color: #999;
        padding-left: 5px;
    }
    #btn-topic {
        border-radius: 4px;
        font-size: 13px;
        border: 1px solid orangered;
        padding: 2px 7px 2px;
        margin-right: 12px;
        font-weight: 500;
        color: orangered;
    }
    #btn-topic:hover {
        color: #00b5ad;
        border-radius: 4px;
        border: 1px solid #00b5ad;
        box-shadow: none;
        text-decoration: none;
    }
</style>