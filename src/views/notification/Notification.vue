<template>
  <div class="edit">
    <div class="title">
      <p><i class="fa fa-envelope"></i> 我的提醒</p>
    </div>
    <div class="body">
      <div v-for="notification in notifications" :key="notification.id">
        <div :class="[notification.read_at == null ? 'user-article read' : 'user-article']" v-if="notification.type.indexOf('Comment') >= 0">
          <router-link :to="{ name: 'UserArticles', params: { slug: notification.data.user_id } }">
            <span>{{ notification.data.name }}</span>
          </router-link>
          <span class="dex"> · 在话题中评论了你： </span>
          <router-link :to="{ name: 'ArticleShow', params: { slug: notification.data.title_id } }">
            <span>{{ notification.data.title }}</span>
          </router-link>
          <span class="dex"> · 于 {{ notification.created_at }}</span>
          <p>{{ notification.data.comment }}</p>
          <div style="border-bottom: 1px solid #eee; padding-top: 20px"></div>
        </div>
        <div :class="[notification.read_at == null ? 'user-article read' : 'user-article']" v-if="notification.type.indexOf('Follow') >= 0">
          <router-link :to="{name: 'UserArticles', params: {slug: notification.data.user_id}}">
            <span>{{ notification.data.name }}</span>
          </router-link>
          <span class="dex"> · 关注了你 </span>
          <span class="dex"> · 于 {{ notification.created_at }}</span>
          <div style="border-bottom: 1px solid #eee; padding-top: 20px"></div>
        </div>
        <div :class="[notification.read_at == null ? 'user-article read' : 'user-article']" v-if="notification.type.indexOf('Like') >= 0">
          <router-link :to="{ name: 'UserArticles', params:  {slug: notification.data.user_id } }">
            <span>{{ notification.data.name }}</span>
          </router-link>
          <span class="dex"> · 点赞了你的话题： </span>
          <router-link :to="{ name: 'ArticleShow', params: { slug: notification.data.title_id } }">
            <span>{{ notification.data.title }}</span>
          </router-link>
          <span class="dex"> · 于 {{ notification.created_at }}</span>
          <div style="border-bottom: 1px solid #eee; padding-top: 20px"></div>
        </div>
      </div>
    </div>
    <div v-if="!notifications.length" class="no-article">
      <p>没有任何数据~~</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "../../api";

export default {
  data() {
    return {
      notifications: []
    };
  },
  async mounted() {
    const res = await api.get_notifications();
    if (res.data.status) {
      this.notifications = res.data.data;
      api.notifications_read();
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #555;
  .title {
    border-bottom: 1px solid #ddd;
    p {
      font-size: 26px;
      padding: 40px 20px 20px 30px;
    }
  }
  .body {
    padding: 0 0 30px;
    .read {
      background-color: #fff9ce;
    }
    .user-article {
      padding: 20px 10px 0 20px;
      a {
        font-size: 15px;
        color: #00b5ad;
        &:hover {
          color: tomato;
        }
      }
      p {
        padding-top: 10px;
      }
      .dex {
        color: #999;
        font-size: 14px;
      }
    }
  }
  .no-article {
    padding: 0 0 30px 30px;
  }
}
</style>
