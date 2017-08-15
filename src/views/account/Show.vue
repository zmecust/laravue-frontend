<template>
  <div id="load-show">
    <el-row :gutter="25">
      <el-col :span="4" :offset="5">
        <div class="sidebar-author">
          <p>作者： {{user.name}}</p>
          <div style="border-bottom: 1px solid #eee; padding-top: 0px"></div>
          <img :src="user.avatar" alt="">
          <el-row>
            <el-col :span="8">
              <h2>{{user.followers_count}}</h2>
              <p>关注者</p>
            </el-col>
            <el-col :span="8">
              <h2>{{user.comments_count}}</h2>
              <p>评论</p>
            </el-col>
            <el-col :span="8">
              <h2>{{user.articles_count}}</h2>
              <p>文章</p>
            </el-col>
          </el-row>
          <el-button class="btn-define" @click="submit('ruleForm')"><i class="fa fa-plus"></i> 关注 Ta</el-button>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="article">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const userId = this.$route.params.slug;

  export default {
    data() {
      return {
        user: ''
      }
    },
    mounted() {
      api.get_user(userId).then((res) => {
        this.user = res.data.data;
      });
    },
  }
</script>

<style lang="scss" scoped>
  .sidebar-author {
    text-align: center;
    margin-top: 40px;
    border: 1px solid #eee;
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