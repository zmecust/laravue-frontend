<template>
  <div class="upload-container">
    <el-upload class="upload-demo" drag :action="upload_url" :on-success="uploadCallback" :show-file-list="false" :headers="headers">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store';
const accessToken = store.state.account.auth.access_token;

export default {
  props: ['url'],
  data() {
    return {
      upload_url: this.$http.options.root + this.url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  },
  methods: {
    uploadCallback(response, file, fileList) {
      if (1 === response.status) {
        this.$emit('result', response.data.url);
      }
    }
  }
}
</script>
