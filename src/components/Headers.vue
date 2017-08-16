<template>
    <div class="header">
        <el-row>
            <el-col :span="14" :offset="5">
                <div class="grid-content bg-purple">
                    <div class="head-left">
                        <div style="float: left; padding-right: 10px">
                            <router-link style="font-size: 25px; font-weight: bold" to="/">
                                <span style="color: orangered">Lara</span><span style="color: #00b5ad">Vue</span>
                            </router-link>
                        </div>
                        <div class="head-nav">
                            <router-link class="head-link" to="/">首页</router-link>
                        </div>
                        <div class="head-nav">
                            <router-link class="head-link" to="/payment">打赏</router-link>
                        </div>
                        <div class="head-nav">
                            <router-link class="head-link" to="/about">关于</router-link>
                        </div>
                        <div style="float: left; padding-left: 40px">
                            <form method="GET" action="/search" accept-charset="UTF-8">
                                <input class="search-input" name="q" type="text" placeholder="搜索">
                            </form>
                        </div>
                    </div>
                    <div class="head-right">
                        <div class="dropdown" v-if="auth.check()">
                            <span><img :src="auth.user.avatar" alt=""></span>
                            <p class="dropbtn">{{auth.user.name}} <span><i class="fa fa-caret-down"></i></span></p>
                            <div class="dropdown-content">
                                <router-link :to="{name: 'UserArticles', params: {slug: auth.id}}">
                                    <span><i class="fa fa-user"></i></span><span style="padding-left: 20px">个人中心</span>
                                </router-link>
                                <a href=""><span><i class="fa fa-gear"></i></span><span style="padding-left: 20px">编辑资料</span></a>
                                <a @click.prevent="logOut()">
                                    <span><i class="fa fa-sign-out"></i></span><span style="padding-left: 20px">退出</span>
                                </a>
                            </div>
                        </div>
                        <div v-if="! auth.check()" class="head-nav-login">
                            <router-link class="this-login" to="/user/register">
                                注册
                            </router-link>
                        </div>
                        <div v-if="! auth.check()" class="head-nav-login">
                            <router-link class="this-login" to="/user/login">
                                登录
                            </router-link>
                        </div>
                        <div style="float: right; padding-top: 2px">
                            <router-link to="/article/create" id="btn-topic">
                                <i class="fa fa-pencil"></i> 写文章
                            </router-link>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: mapState({
      auth: state => state.account.auth,
    }),
    methods: {
      logOut() {
        this.$store.dispatch('accountLogoutSubmit').then(
          res => {this.$router.push('/')}
        );
      }
    }
  }
</script>

<style lang="scss" scoped>
    .header {
        border-bottom: #ddd solid 1px;
    }
    .head-left {
        line-height: 50px;
        .head-nav {
            padding-top: 1px;
            float: left;
            padding-left: 20px;
            color: #555;
            .head-link {
                color: #555;
                &:hover {
                    color: #00b5ad;
                    border-bottom: 1px solid #00b5ad;
                    margin-bottom: -1px;
                }
            }
        }
    }
    .head-right {
        line-height: 50px;
        .head-nav-login {
            padding-top: 1px;
            padding-left: 30px;
            float: right;
        }
    }
    .icon {
        text-decoration: none;
        font-weight: bold;
        font-size: 25px;
        text-align: left;
    }
    .bg-purple-dark {
        background: #fff;
    }
    .grid-content {
        min-height: 50px;
    }
    .this-login {
        color: #555;
        font-weight: 600;
    }
    .this-login:hover {
        color: #00b5ad;
        border-bottom: 2px solid #00b5ad;
        margin-bottom: -2px;
    }
    .search-input {
        background-repeat: no-repeat;
        background-position: 9px;
        background-color: #f1f1f1;
        padding-left: 25px;
        border: 0px solid #c6c6c6;
        box-shadow: none;
        transition: all 0.15s ease-in 0.1s;
        margin-top: 1px;
        height: 35px;
        width: 200px;
        border-radius: 100px;
    }
    .search-input:focus,
    .search-input:hover,
    .search-input:active {
        border-radius: 100px;
        box-shadow: none;
        border: 0px solid #c6c6c6;
        background: no-repeat 0 0 scroll #f1f1f1;
        border:none;
        outline: medium;
    }

    .dropbtn {
        float: right;
        color: #555;
        font-size: 16px;
        font-weight: bold;
        border: none;
        cursor: pointer;
        padding-left: 50px;
    }
    .dropdown {
        padding-left: 20px;
        float: right;
        position: relative;
        display: inline-block;
    }
    .dropdown-content {
        z-index: 1;
        margin-top: 50px;
        font-size: 15px;
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    }
    .dropdown-content a {
        padding-left: 30px;
        color: black;
        text-decoration: none;
        display: block;
        border: 1px solid #eee;
    }
    .dropdown-content a:hover {
        background-color: #f1f1f1;
        color: #00b5ad;
    }
    .dropdown:hover .dropdown-content {
        display: block;
    }
    .dropdown:hover .dropbtn {
        background-color: #fff;
    }
    img {
        position: absolute;
        width: 40px;
        border: 1px solid #aaa;
        border-radius: 100px;
        margin-top: 5px;
    }
    #btn-topic {
        background-color: tomato;
        font-size: 16px;
        padding: 10px 20px 10px 20px;
        border-radius: 100px;
        color: #fff;
    }
    #btn-topic:hover {
        color: #00b5ad;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #00b5ad;
        box-shadow: none;
        text-decoration: none;
    }
</style>