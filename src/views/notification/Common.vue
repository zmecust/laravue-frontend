<template>
  <div>
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <el-col :span="7">
        <div class="user-info">
          <ul class="reply">
            <li>
              <router-link to="notification">
                <i class="fa fa-envelope"></i> 通知
              </router-link>
            </li>
            <li>
              <router-link to="message">
                <i class="fa fa-bell" aria-hidden="true"></i> 私信
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
import { mapState } from "vuex";

export default {
  computed: mapState({
    id: state => state.account.auth.id
  })
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
      .router-link-active {
        color: #00b5ad;
      }
    }
  }
}
</style>
