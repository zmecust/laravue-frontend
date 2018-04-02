<template>
  <div id="load-show">
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <el-col :span="7">
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
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
        &:hover,
        &:active,
        &:focus {
          color: #00b5ad;
        }
      }
      .router-link-active {
        color: #00b5ad;
      }
    }
  }
}
</style>