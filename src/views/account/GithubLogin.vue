<template>

</template>

<script>
import { mapMutations } from 'vuex';
import api from '../../api';
import Cookies from 'js-cookie';

export default {
  async beforeCreate() {
    const res = await api.login_redirect(this.$route.query.access_token);
    if (res.data.status) {
      this.$store.commit('ACCOUNT_AUTH_STATUS_CHANGED', res.data);
      this.$router.push('/');
    } else {
      this.$router.push('/user/login');
    }
  }
}
</script>