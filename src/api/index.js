import Vue from 'vue';
import VueResource from 'vue-resource';
import store from '../store';

Vue.use(VueResource);

Vue.http.options.root = process.env.API_URL;
Vue.http.headers.common.Accept = `application/json`;

Vue.http.interceptors.push((request, next) => {
  const auth = store.state.account.auth;
  if(auth.check()) {
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
  register(params) {
    return Vue.http.post('user/register', params);
  },
  verify_email(code) {
    return Vue.http.get('user/register', code);
  },
  logout() {
    return Vue.http.get('user/logout');
  },
  get_articles() {
    return Vue.http.get('articles');
  },
  get_article(id) {
    return Vue.http.get('articles/' + id);
  },
  create_article(params) {
    return Vue.http.post('articles', params);
  },
  edit_article(id, params) {
    return Vue.http.patch('articles/' + id, params);
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
  is_like_or_not(id) {
    return Vue.http.get('article/is_like', {params: {id: id}});
  },
  like(id) {
    return Vue.http.get('article/like', {params: {id: id}});
  }
}
