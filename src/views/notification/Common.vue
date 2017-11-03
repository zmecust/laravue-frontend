<template>
  <div>
    <el-row :gutter="25">
      <el-col :span="4" :offset="5">
        <div class="user-info">
          <ul class="reply">
            <li>
              <router-link to="notification" :style="[path == 'notification' ? active : '']">
                <i class="fa fa-envelope"></i> 通知
              </router-link>
            </li>
            <li>
              <router-link to="message" :style="[path == 'message' ? active : '']">
                <i class="fa fa-bell" aria-hidden="true"></i> 私信
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
import { mapState } from "vuex";

export default {
  computed: mapState({
    id: state => state.account.auth.id
  }),
  data() {
    return {
      active: {
        color: "#00b5ad"
      },
      path: this.$route.path.split("/")[1]
    };
  },
  watch: {
    $route(to, from) {
      this.path = this.$route.path.split("/")[1];
    }
  }
};
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
