<template>
  <div class="edit">
    <div class="title">
      <p>
        <i class="fa fa-bell" aria-hidden="true"></i> 我的私信</p>
    </div>
    <div class="body">
      <p>该功能尚未完成~~</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '../../api';

export default {
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
  }
}
</style>
