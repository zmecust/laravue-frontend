<template>

</template>

<script>
import { mapMutations } from 'vuex';
import api from '../../api';

export default {
  beforeCreate() {
    let verify_code = this.$route.params.slug;
    api.verify_email({ params: { code: verify_code } }).then((res) => {
      if (res.data.status == 1) {
        this.$store.commit('ACCOUNT_AUTH_STATUS_CHANGED', res.data);
        this.$router.push({ path: '/', query: { validate: 'yes' } });
      } else {
        this.$router.push({ path: '/', query: { validate: 'no' } });
      }
    });
  }
}
</script>