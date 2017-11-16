import Vue from 'vue';
import VueResource from 'vue-resource';
import store from '../store';

Vue.use(VueResource);

Vue.http.options.root = process.env.API_URL;
Vue.http.headers.common.Accept = `application/json`;

Vue.http.interceptors.push((request, next) => {
  const auth = store.state.account.auth;
  if (auth.check()) {
    const accessToken = auth.access_token;
    Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete Vue.http.headers.common.Authorization;
  }
  next();
});

export default {
  login(params) {
    return Vue.http.post('user/login', params);
  },
  github_login(params) {
    return Vue.http.post('https://github.com/login/oauth/access_token', params);
  },
  login_redirect(params) {
    return Vue.http.get('https://api.laravue.org/github/login/redirect?access_token=' + params);
  },
  register(params) {
    return Vue.http.post('user/register', params);
  },
  verify_email(code) {
    return Vue.http.get('verify_email', code);
  },
  logout() {
    return Vue.http.get('user/logout');
  },
  edit_password(params) {
    return Vue.http.post('edit_password', params);
  },
  edit_user_info(params) {
    return Vue.http.post('edit_user_info', params);
  },

  get_user(id) {
    return Vue.http.get('users/' + id);
  },
  user_get_articles(id) {
    return Vue.http.get('users/' + id + '/articles');
  },
  user_get_replies(id) {
    return Vue.http.get('users/' + id + '/replies');
  },
  user_like_articles(id) {
    return Vue.http.get('users/' + id + '/like_articles');
  },
  user_follow_users(id) {
    return Vue.http.get('users/' + id + '/follow_users');
  },

  get_articles(params) {
    return Vue.http.get('articles', params);
  },
  get_article(id) {
    return Vue.http.get('articles/' + id);
  },
  create_article(params) {
    return Vue.http.post('articles', params);
  },
  content_image(params) {
    return Vue.http.post('content_image', params);
  },
  edit_article(id, params) {
    return Vue.http.patch('articles/' + id, params);
  },
  get_comments(id) {
    return Vue.http.get('articles/' + id + '/comments');
  },
  get_child_comment(id, params) {
    return Vue.http.get('articles/' + id + '/child_comments?parent_id=' + params);
  },
  create_comment(params) {
    return Vue.http.post('comments', params);
  },
  hot_articles() {
    return Vue.http.get('hot_articles');
  },
  hot_tags() {
    return Vue.http.get('hot_tags');
  },
  get_tags() {
    return Vue.http.get('tags');
  },
  get_article_likes(id) {
    return Vue.http.get('articles/' + id + '/like');
  },
  is_like_or_not(id) {
    return Vue.http.get('article/is_like', { params: { id: id } });
  },
  like(id) {
    return Vue.http.get('article/like', { params: { id: id } });
  },
  is_follow_or_not(id) {
    return Vue.http.get('user/is_follow', { params: { id: id } });
  },
  follow(id) {
    return Vue.http.get('user/follow', { params: { id: id } });
  },
  get_categories() {
    return Vue.http.get('categories');
  },
  send_message(params) {
    return Vue.http.post('message/store', params);
  },
  get_notification_count() {
    return Vue.http.get('message/count');
  },
  get_notifications() {
    return Vue.http.get('notifications');
  },
  notifications_read() {
    return Vue.http.get('notifications/read');
  },
  search(params) {
    return Vue.http.get('search', { params: { q: params } });
  }
}
