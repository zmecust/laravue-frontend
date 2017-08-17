<template>

</template>

<script>
  import { mapMutations } from 'vuex';
  import api from '../../api';

  export default {
    created() {
      let verify_code = this.$route.params.slug;
      api.verify_email({params: verify_code}).then((res) => {
        if (res.data.status == 1) {
          this.$store.commit('ACCOUNT_AUTH_STATUS_CHANGED', res.data);
        }
        this.$router.push('/');
      });
    }
  }
</script>