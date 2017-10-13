import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const Login = resolve => require(['../views/account/Login'], resolve) //懒加载
const Register = resolve => require(['../views/account/Register'], resolve)
const VerifyEmail = resolve => require(['../views/account/VerifyEmail'], resolve)
const GithubLogin = resolve => require(['../views/account/GithubLogin'], resolve)
const Common = resolve => require(['../views/Common'], resolve)
const ArticleIndex = resolve => require(['../views/article/Index'], resolve)
const ArticleShow = resolve => require(['../views/article/Show'], resolve)
const ArticleCreate = resolve => require(['../views/article/Create'], resolve)
const ArticleEdit = resolve => require(['../views/article/Edit'], resolve)
const UserInfo = resolve => require(['../views/account/UserInfo'], resolve)
const UserArticles = resolve => require(['../views/account/UserArticles'], resolve)
const UserReplies = resolve => require(['../views/account/UserReplies'], resolve)
const UserLikesUsers = resolve => require(['../views/account/UserLikesUsers'], resolve)
const UserLikesArticles = resolve => require(['../views/account/UserLikesArticles'], resolve)
const About = resolve => require(['../views/other/About'], resolve)
const Payment = resolve => require(['../views/other/Payment'], resolve)
const Error404 = resolve => require(['../views/error/404'], resolve)

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/verify_email/:slug',
      name: 'VerifyEmail',
      component: VerifyEmail
    },
    {
      path: '/github/login',
      name: 'GithubLogin',
      component: GithubLogin
    },
    {
      path: '/',
      name: 'Common',
      component: Common,
      children: [
        {
          path: '/',
          component: ArticleIndex,
        },
        {
          path: '/articles',
          name: 'ArticleIndex',
          component: ArticleIndex
        },
        {
          path: '/articles/:slug',
          name: 'ArticleShow',
          component: ArticleShow
        },
        {
          path: '/article/create',
          meta: {
            requireAuth: true
          },
          component: ArticleCreate
        },
        {
          path: '/articles/:slug/edit',
          name: 'ArticleEdit',
          meta: {
            requireAuth: true
          },
          component: ArticleEdit
        },
        {
          path: '/users/:slug',
          component: UserInfo,
          children: [
            {
              path: '/',
              component: UserArticles
            },
            {
              path: 'articles',
              name: 'UserArticles',
              component: UserArticles
            },
            {
              path: 'replies',
              name: 'UserReplies',
              component: UserReplies
            },
            {
              path: 'likes_users',
              name: 'UserLikesUsers',
              component: UserLikesUsers
            },
            {
              path: 'likes_articles',
              name: 'UserLikesArticles',
              component: UserLikesArticles
            }
          ]
        },
        {
          path: '/about',
          name: 'About',
          component: About
        },
        {
          path: '/payment',
          name: 'Payment',
          component: Payment
        },
      ]
    },
    {
      path: '*',
      component: Error404,
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some(record => record.meta.requireAuth)) {
    const auth = store.state.account.auth;
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.check()) {
      next({
        path: '/user/login',
        query: { redirect_url: to.fullPath }
      });
      return;
    }
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;