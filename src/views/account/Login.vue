<template>
    <div>
        <headers></headers>
        <div id="login" class='login-wrap'>
            <div class="container">
                <div class="ms-title">
                    <span><router-link to="/user/login" style="color: #00b5ad; font-weight: bold">登录</router-link></span>
                    <span class="this-span">·</span>
                    <span><router-link to="/user/register" style="color: #00b5ad; font-weight: bold">注册</router-link></span>
                </div>
                <div class="ms-login">
                    <el-form :model="params" label-width="68px" class="demo-ruleForm">
                        <el-form-item prop="login" label="账号：">
                            <el-input v-model="params.login" placeholder="用户名/邮箱"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码：">
                            <el-input type="password" placeholder="请输入密码" v-model="params.password"></el-input>
                        </el-form-item>
                        <div class="login-failure" v-if="failure">
                            <div class="header">{{failure.message}}</div>
                            <ul class="list">
                                <li v-for="error in failure.data">{{error[0]}}</li>
                            </ul>
                        </div>
                        <div class="login-btn">
                            <el-button class="btn-define" @click="submit('ruleForm')">登 录</el-button>
                        </div>
                    </el-form>
                    <div class="pull-center">
                        <el-button class="github_login" @click="github_login()">GitHub 账号登录</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import api from '../../api';
  import { mapState, mapMutations } from 'vuex';
  import Headers from '../../components/Headers';

  export default {
    name: 'login',
    components: {
      Headers
    },
    data() {
      return {
        params: {
          login: '',
          password: '',
        }
      };
    },
    computed: mapState({
      success: state => state.account.login.success,
      failure: state => state.account.login.failure,
    }),
    methods: {
      submit() {
        this.$store.dispatch('accountLoginSubmit', this.params);
      },
      successWatcher(val, oldVal) {
        if (val && !oldVal) {
          const redirectUrl = this.$route.query.redirect_url || '/';
          this.$router.push(redirectUrl);
        }
      },
      github_login() {
        api.github_login().then((res) => {
          console.log(res.data);
          if (res.data.status == 1) {
            this.$store.commit('ACCOUNT_AUTH_STATUS_CHANGED', res.data);
            this.$router.push('/');
          }
        });
      }
    },
    watch: {
      success: 'successWatcher',
    }
  }
</script>

<style lang="scss" scoped>
    .message {
        margin-bottom: 18px;
        text-align: center
    }
    .login-wrap {
        position: relative;
        margin-top: 5%;
        width: 100%;
        height: 100%;
        .container {
            position: absolute;
            top: 10%;
            left: 38%;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
    }
    .ms-title {
        margin: 40px 0 20px;
        text-align: center;
        font-size: 25px;
        color: #555;
        .this-span {
            padding: 0 20px 0 20px;
        }
    }
    .ms-login {
        width: 360px;
        padding: 40px;
        border-radius: 5px;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 36px;
    }
    .btn-define {
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
    .pull-center {
        text-align: center;
    }
    .login-failure {
        padding: 10px 0 10px;
        border-radius: 4px;
        background-color: #ffeef0;
        margin-bottom: 20px;
        color: red;
        line-height: 1.6;
        text-align: left;
        .header {
            padding: 10px 0 0 35px;
            font-weight: bold;
        }
        .list {
            padding: 10px 0 0 35px;
        }
    }
    .github_login {
        background-color: #fff;
        border: 0;
        border-radius: 5px;
        color: #00b5ad;
        font-size: 15px;
        font-weight: bold;
        box-shadow: none;
        &:hover {
            box-shadow: none;
        }
    }
</style>