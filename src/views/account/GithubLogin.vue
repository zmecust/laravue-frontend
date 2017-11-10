<template>

</template>

<script>
import { mapMutations } from 'vuex';
import api from '../../api';
import Cookies from 'js-cookie';

export default {
  beforeCreate() {
    let user = Cookies.getJSON('user');
    console.log(user);
    if (user) {
      this.$store.commit('ACCOUNT_AUTH_STATUS_CHANGED', user);
      this.$router.push('/');
    } else {
      this.$router.push('/user/login');
    }
  }
}
</script>