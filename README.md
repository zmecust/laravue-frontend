## 微型社区 LaraVue 的前台项目，地址：https://laravue.org (开发中)

> 前后端分离，通过 token 验证用户信息，调取后端 API。

## 前言

LaraVue 是两个框架名字组合而成的，这两个框架是我接触编程学的第一个后端框架 “Laravel”  以及第一个前段框架 “Vue”。本来今年三月份准备申请 laravue.com 的域名，但是发现国外一哥们抢先我三天申请了。 这个微型社区是一个前后端完全分离的项目，是我前一个社区的改进版，无奈自己的 CSS 太渣，不然这几个页面早就撸完了。 该社区也没有什么定位，主要是对一些技术上的思考进行分享，方便自己顺便方便后人。

## 技术栈

vue2 + vuex + vue-router + vue-resource + ES6 + element-ui + sass

## 安装

```
> git clone

> npm i

> npm run dev
```

## 项目布局

```
.
├── build                                       // webpack 配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
|   ├── api
|   |   └── index.js                            // 后端 API 接口配置
│   ├── assets                                  // 图片存放地
│   ├── components                              // 组件
│   │   ├── Comment.vue                         // 评论组件
│   │   ├── Editor.vue                          // 编辑器组件
│   │   ├── Footers.vue                         // 尾部组件
│   │   ├── Headers.vue                         // 头部组件
│   │   ├── HotTopics.vue                       // 侧边栏热门话题组件
│   │   └── Popup.vue                           // 弹出框组件
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── store                                   // vuex 的状态管理
│   │   ├── modules                             // store 模块
|   |   |   └── account.js                      // 用户信息
│   │   ├── index.js                            // 引用vuex，创建 store
│   │   └── mutation-types.js                   // 定义常量 muations 名
|   ├── views                                   // 视图
│   │   ├── account                             // 用户视图
|   |   |   ├── Editor.vue                      // 编辑用户信息
|   |   |   ├── Login.vue                       // 登录页面
|   |   |   ├── Register.vue                    // 注册页面
|   |   |   ├── UserArticles.vue                // 用户发表的文章
|   |   |   ├── UserInfo.vue                    // 用户视图公共组件
|   |   |   ├── UserLikeArticles.vue            // 用户点赞的话题
|   |   |   ├── UserLikeUsers.vue               // 用户关注其他用户
|   |   |   ├── UserReplies.vue                 // 用户回复
|   |   |   └── VerifyEmail.vue                 // 注册激活
│   │   ├── article                             // 文章视图
|   |   |   ├── Create.vue                      // 编辑用户信息
|   |   |   ├── Editor.vue                      // 登录页面
|   |   |   ├── Index.vue                       // 注册页面
|   |   |   └──show.vue                         // 用户发表的文章
│   │   ├── error                               
|   |   |   └──404.vue                          // 404 错误
│   │   ├── other                               
|   |   |   ├──About.vue                        // 个人信息页面
|   |   |   └──Payment.vue                      // 打赏页面
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── static                                      // 静态文件
|   ├── css                                     // css 文件
|   |   └── markdown.css                         
├── index.html                                  // 入口 html 文件
.

```

## 联系我

如有任何疑问或者问题，可随时联系我 `root@laravue.org`
