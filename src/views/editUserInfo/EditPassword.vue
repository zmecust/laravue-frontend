<template>
  <div class="edit">
    <div class="title">
      <p>
        <i class="fa fa-lock" aria-hidden="true"></i> 修改密码</p>
    </div>
    <div class="body">
      <form action="" v-on:submit.prevent>
        <div class="article-create">
          <dt style="">邮箱：</dt>
          <el-input type="text" class="el-input" disabled="disabled" v-model="auth.user.email"></el-input>
        </div>
        <div class="article-create">
          <dt style="">新密码：</dt>
          <el-input type="password" class="el-input" v-model="params.password" placeholder="至少6个字符"></el-input>
        </div>
        <div class="article-create">
          <dt style="">确认密码：</dt>
          <el-input type="password" class="el-input" v-model="params.password_confirmation" placeholder="至少6个字符"></el-input>
        </div>
        <div>
          <button class="article-button" type="submit" @click="submit()">提交修改</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '../../api';

export default {
  computed: mapState({
    auth: state => state.account.auth
  }),
  data() {
    return {
      params: {
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    async submit() {
      const res = await api.edit_password(this.params);
      this.open(res.data.message);
    },
    open(mes) {
      this.$alert(mes, '', {
        confirmButtonText: '确定'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.edit {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #555;
  .title {
    border-bottom: 1px solid #ddd;
    p {
      font-size: 26px;
      padding: 40px 20px 20px 30px;
    }
  }
  .body {
    padding: 30px 0 30px;
    .article-create {
      margin-bottom: 20px;
      dt {
        color: #555;
        padding-top: 5px;
        width: 18%;
        text-align: right;
        float: left;
      }
      .el-input {
        width: 70%;
        margin-left: 2%;
      }
      #editor {
        height: 400px;
      }
    }
    .article-button {
      cursor: pointer;
      width: 70%;
      margin-left: 20%;
      background-color: #00b5ad;
      color: #fff;
      font-size: 16px;
      padding: 5px 10px 5px 10px;
      border: 1px solid #00b5ad;
      border-radius: 100px;
      box-shadow: none;
      &:hover,
      &:focus,
      &:active {
        color: tomato;
        border: 1px solid tomato;
        box-shadow: none;
        border-radius: 100px;
        background-color: #fff;
      }
    }
  }
}
</style>
