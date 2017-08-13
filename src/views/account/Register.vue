<template>
    <div id="register" class='login-wrap'>
        <div class="container">
            <div class="ms-title">
                <span><router-link to="/user/login" style="color: #00b5ad; font-weight: bold">登录</router-link></span>
                <span class="this-span">·</span>
                <span><router-link to="/user/register" style="color: #00b5ad; font-weight: bold">注册</router-link></span>
            </div>
            <div class="ms-login">
                <div v-if="failure" style="color: red">{{failure.message}}</div>
                <el-form ref="params" :model="params" :rules="rules" label-width="82px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="params.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="params.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                        <el-input type="password" placeholder="请输入密码" v-model="params.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="password_confirmation" label="确认密码">
                        <el-input type="password" placeholder="请再次输入密码" v-model="params.password_confirmation"></el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button class="btn-define" @click="submit('ruleForm')">注 册</el-button>
                    </div>
                </el-form>
                <div class="pull-center">
                    GitHub 账号注册
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'register',
    data() {
      return {
        rules: {
        },
        params: {
          name: '',
          email: '',
          code: '',
          password: '',
          password_confirmation: '',
        }
      };
    },
    computed: mapState({
      success: state => state.account.register.success,
      failure: state => state.account.register.failure,
    }),
    methods: {
      submit() {
        this.$store.dispatch('accountRegisterSubmit', this.params);
      },
      successWatcher(val, oldVal) {
        if (val && !oldVal) {
          this.$router.push('/');
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