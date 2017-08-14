import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const Login = resolve => require(['../views/account/Login'], resolve) //懒加载
const Register = resolve => require(['../views/account/Register'], resolve)
const VerifyEmail = resolve => require(['../views/account/VerifyEmail'], resolve)
const ArticleIndex = resolve => require(['../views/article/Index'], resolve)
const ArticleShow = resolve => require(['../views/article/Show'], resolve)
const ArticleCreate = resolve => require(['../views/article/Create'], resolve)
const UserShow = resolve => require(['../views/article/Show'], resolve)
const About = resolve => require(['../views/other/About'], resolve)

Vue.use(Router)

const router = new Router({
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
      component: VerifyEmail
    },
    {
      path: '/',
      component: ArticleIndex
    },
    {
      path: '/articles',
      component: ArticleIndex
    },
    {
      path: '/articles/:id',
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
      path: '/users/:slug',
      name: 'UserShow',
      component: UserShow
    },
    {
      path: '/tags/:id/articles',
      name: 'TagsArticle',
      component: UserShow
    },
    {
      path: '/about',
      component: About
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