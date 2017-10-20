<template>
  <div class="edit">
    <div class="title">
      <p>
        <i class="fa fa-picture-o" aria-hidden="true"></i> 更换图像</p>
    </div>
    <div class="body">
      <div class="upload-container">
        <div class="avatar">
          <img :src="auth.user.avatar" alt="">
        </div>
        <div><p>更换图像：</p></div>
        <el-upload class="upload-demo" drag :action="upload_url" :on-success="uploadCallback" :show-file-list="false" :headers="headers">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '../../api';
import store from '../../store';

const accessToken = store.state.account.auth.access_token;

export default {
  computed: mapState({
    auth: state => state.account.auth
  }),
  data() {
    return {
      upload_url: this.$http.options.root + '/avatar/upload',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  },
  methods: {
    uploadCallback(response, file, fileList) {
      if (1 == response.status) {
        this.$store.commit('ACCOUNT_AVATAR_UPLOAD', response.data.avatar);
      }
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
  }
}
</style>
