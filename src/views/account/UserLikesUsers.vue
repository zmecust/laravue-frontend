<template>
  <div class="user-articles">
    <div v-if="users" v-for="user in users" :key="user.id" style="float: left">
      <el-button @click="submit(user.id)">
        <img :src="user.avatar" alt="">
        <span>{{ user.name }}</span>
      </el-button>
    </div>
    <div style="clear: both; margin-bottom: 15px"></div>
    <div v-if="! users">
      <div class="no-article">
        <p>没有任何数据~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api';

export default {
  data() {
    return {
      users: ''
    }
  },
  mounted() {
    api.user_follow_users(this.$route.params.slug).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data.length) {
          this.users = res.data.data;
        }
      }
    });
  },
  methods: {
    submit(id) {
      this.$router.push({name: 'UserArticles', params: {slug: id}});
    }
  }
}
</script>

<style lang="scss" scoped>
.user-articles {
  margin-top: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 0 10px;
  button {
    border-radius: 100px;
    margin: 10px 0 0 10px;
    padding: 0;
    img {
      width: 38px;
      border-radius: 100px;
      vertical-align: middle
    }
    span {
      font-size: 16px;
      padding: 0 5px 0;
    }
  }
  .no-article {
    text-align: center;
    p {
      margin: 30px 0 30px;
    }
  }
}
</style>