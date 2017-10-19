<template>
  <div>
    <el-row :gutter="25">
      <el-col :span="4" :offset="5">
        <div class="user-info">
          <ul class="reply">
            <li>
              <router-link :to="{name: 'EditUserInfo', params: {slug: id}}" :style="[path == 'edit' ? active : '']">
                <i class="text-md fa fa-list-ul"></i> 个人信息
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'EditAvatar', params: {slug: id}}" :style="[path == 'edit_avatar' ? active : '']">
                <i class="fa fa-picture-o" aria-hidden="true"></i> 更换图像
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'EditPassword', params: {slug: id}}" :style="[path == 'edit_password' ? active : '']">
                <i class="fa fa-lock" aria-hidden="true"></i> 修改密码
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="10">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    id: state => state.account.auth.id
  }),
  data() {
    return {
      active: {
        color: '#00b5ad'
      },
      path: this.$route.path.split('/')[3]
    }
  },
  watch: {
    '$route'(to, from) {
      this.path = this.$route.path.split('/')[3]
    }
  }
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
        // &:hover,
        // &:active,
        // &:focus {
        //   color: #00b5ad;
        // }
      }
    }
  }
}
</style>
