<template>
    <div class="preview">
        <div class="preview-wrapper">
            <div class="preview-container">
                <div class="preview-body">
                    <div class="font">
                        <span><i class="fa fa-exclamation" aria-hidden="true"></i></span>
                    </div>
                    <h4>您还未登录</h4>
                    <el-button class="btn-like" @click="accept">确定</el-button>
                </div>
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
        width: 400px;
        height: 150px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 2px;
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
        width: 380px;
        height: 130px;
        margin: 10px 10px 10px 10px;
        .font {
            border-radius: 100px;
            border: 4px solid gold;
            color: gold;
            height: 100px;
            width: 100px;
            margin: 10px auto;
        }
        span {
            font-size: 56px;
            margin-left: 40px;
        }
    .btn-like {
        background-color: #00b5ad;
        color: #fff;
        font-size: 18px;
        padding: 8px 15px 8px 15px;
        border-radius: 4px;
        box-shadow: none;
        cursor: pointer;
    }
    .btn-like:hover,
    .btn-like:active {
        background-color: #169e98;
    }
    }
    .preview-body > h4 {
        position: absolute;
        top: 25%;
        left: 20%;
    }
    .preview-body > button {
        position: absolute;
        right: 10px;
        bottom: 0px;
    }
</style>