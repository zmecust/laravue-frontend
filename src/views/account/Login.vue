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
                    <el-form :model="params" :rules="rules" ref="ruleForm" label-width="68px" class="demo-ruleForm">
                        <el-form-item prop="login" label="账号：">
                            <el-input v-model="params.login" placeholder="请输入用户名或邮箱" ></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码：">
                            <el-input type="password" placeholder="请输入密码" v-model="params.password"></el-input>
                        </el-form-item>
                        <div v-if="failure" style="color:red" class='message'>{{failure.data}}</div>
                        <div class="login-btn">
                            <el-button class="btn-define" @click="submit('ruleForm')">登 录</el-button>
                        </div>
                    </el-form>
                    <div class="pull-center">
                        GitHub 账号登录
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Headers from '../../components/Headers';
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: 'login',
    components: {
      Headers
    },
    data() {
      return {
        rules: {
        },
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
            left: 40%;
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
        width: 300px;
        height: 200px;
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
</style>