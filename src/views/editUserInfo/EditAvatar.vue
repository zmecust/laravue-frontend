<template>
  <div class="edit">
    <div class="title">
      <p>
        <i class="fa fa-picture-o" aria-hidden="true"></i> 更换图像</p>
    </div>
    <div class="body">
      <div class="upload-container">
        <div class="avatar">
          <img :src="upload_avatar" alt="">
        </div>
        <div><p>更换图像：</p></div>
        <Upload :url="'/avatar/upload'" @result="uploadCallback"></Upload>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Upload from '../../components/Upload.vue';

export default {
  computed: {
    ...mapGetters([
      'upload_avatar',
    ])
  },
  components: {
    Upload
  },
  methods: {
    uploadCallback(data) {
      this.$store.commit('ACCOUNT_AVATAR_UPLOAD', data);
    }
  }
}
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
    padding: 30px 0 30px 30px;
    .avatar {
      margin-bottom: 30px;
      img {
        width: 60%;
      }
    }
    p {
      padding-bottom: 10px; 
    }
  }
}
</style>
