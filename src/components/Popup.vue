<template>
  <div class="preview">
    <div class="preview-wrapper">
      <div class="preview-container">
        <div class="preview-body">
          <div class="font">
            <div class="alert">
              <span>!</span>
            </div>
          </div>
          <p>您还未登录</p>
        </div>
        <div class="confirm" @click="accept">×</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    accept() {
      this.$emit('closePreview');
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.preview-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.preview-container {
  width: 380px;
  height: 230px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
}

.confirm {
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 40px;
}

.confirm:hover {
  color: red;
  cursor: pointer;
}

.preview-body {
  position: absolute;
  width: 360px;
  height: 210px;
  margin: 10px 10px 10px 10px;
  .font {
    border-radius: 200px;
    border: 4px solid gold;
    color: gold;
    height: 110px;
    width: 110px;
    margin: 20px auto;
    .alert {
      font-size: 100px;
      padding-left: 42px;
    }
  }
}

.preview-body>p {
  position: absolute;
  font-size: 24px;
  top: 75%;
  left: 33%;
}
</style>