<template>

</template>

<script>
import { mapMutations } from 'vuex';
import api from '../../api';

export default {
  beforeCreate() {
    console.log(this.$route.params.code);
  }
}
</script>