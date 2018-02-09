import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

const AUTH_ACCESS_TOKEN = 'auth.access_token';
const AUTH_USER = 'auth.user';
const AUTH_USER_ID = 'auth.id';

const localStorage = global.localStorage;
const JSON = global.JSON;

export default {
  state: {
    auth: {
      check() {
        return this.id !== null && this.id !== 0;
      },
      access_token: JSON.parse(localStorage.getItem(AUTH_ACCESS_TOKEN)),
      id: parseInt(localStorage.getItem(AUTH_USER_ID), 10) || 0,
      user: JSON.parse(localStorage.getItem(AUTH_USER))
    },
    login: {
      success: false,
      failure: null
    },
    register: {
      success: false,
      failure: null
    },
    upload_avatar: JSON.parse(localStorage.getItem(AUTH_USER)) ? JSON.parse(localStorage.getItem(AUTH_USER)).avatar : null
  },
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED: (state, data) => {
      if (!data.status) {
        Vue.set(state.auth, 'access_token', null);
        Vue.set(state.auth, 'id', 0);
        Vue.set(state.auth, 'user', null);
        localStorage.removeItem(AUTH_ACCESS_TOKEN);
        localStorage.removeItem(AUTH_USER_ID);
        localStorage.removeItem(AUTH_USER);
        return;
      }
      Vue.set(state.auth, 'access_token', data.data.jwt_token.access_token);
      Vue.set(state.auth, 'id', data.data.id);
      Vue.set(state.auth, 'user', data.data);
      Vue.set(state, 'upload_avatar', data.data.avatar);
      localStorage.setItem(AUTH_ACCESS_TOKEN, JSON.stringify(data.data.jwt_token.access_token));
      localStorage.setItem(AUTH_USER_ID, data.data.id);
      localStorage.setItem(AUTH_USER, JSON.stringify(data.data));
    },
    ACCOUNT_LOGIN_SUCCESS: (state) => {
      Vue.set(state.login, 'success', true);
    },
    ACCOUNT_LOGIN_FAILURE: (state, data) => {
      Vue.set(state.login, 'success', false);
      Vue.set(state.login, 'failure', data);
    },
    ACCOUNT_REGISTER_SUCCESS: (state) => {
      Vue.set(state.register, 'success', true);
    },
    ACCOUNT_REGISTER_FAILURE: (state, data) => {
      Vue.set(state.register, 'success', false);
      Vue.set(state.register, 'failure', data);
    },
    ACCOUNT_AVATAR_UPLOAD: (state, data) => {
      let user = JSON.parse(localStorage.getItem(AUTH_USER));
      user.avatar = data;
      localStorage.removeItem(AUTH_USER);
      localStorage.setItem(AUTH_USER, JSON.stringify(user));
      Vue.set(state, 'upload_avatar', data);
    },
    ACCOUNT_EDIT_USER: (state, data) => {
      let user = JSON.parse(localStorage.getItem(AUTH_USER));
      user.real_name = data.real_name;
      user.city = data.city;
      localStorage.removeItem(AUTH_USER);
      localStorage.setItem(AUTH_USER, JSON.stringify(user));
    }
  },
  actions: {
    accountLoginSubmit({ commit }, params) {
      api.login(params).then((response) => {
        if (response.data.status) {
          commit(types.ACCOUNT_AUTH_STATUS_CHANGED, response.data);
          commit(types.ACCOUNT_LOGIN_SUCCESS);
        } else {
          commit(types.ACCOUNT_LOGIN_FAILURE, response.data);
        }
      })
    },
    accountLogoutSubmit({ commit }) {
      api.logout().then((response) => {
        commit(types.ACCOUNT_AUTH_STATUS_CHANGED, { status: 0 });
      });
    },
    accountRegisterSubmit({ commit }, params) {
      api.register(params).then((response) => {
        if (response.data.status) {
          //commit(types.ACCOUNT_AUTH_STATUS_CHANGED, response.data);
          commit(types.ACCOUNT_REGISTER_SUCCESS);
        } else {
          commit(types.ACCOUNT_REGISTER_FAILURE, response.data);
        }
      })
    }
  }
}