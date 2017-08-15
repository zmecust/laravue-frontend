<template>
    <div>
        <el-row>
            <el-col :span="12" :offset="6">
                <div class="grid-content">
                    <form action="" v-on:submit.prevent>
                        <div class="article-create">
                            <dt style="">标题：</dt>
                            <el-input class="el-input" v-model="params.title" placeholder="至少4个字符"></el-input>
                        </div>
                        <div class="article-create">
                            <dt>标签：</dt>
                            <el-select
                                    class="el-input"
                                    v-model="tags"
                                    multiple
                                    filterable
                                    allow-create
                                    placeholder="请选择文章标签">
                                <el-option
                                        v-for="item in allTags"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="article-create">
                            <dt>内容：</dt>
                            <vue-editor style="width: 70%; padding-left: 17%" v-model="params.body"></vue-editor>
                        </div>
                        <div class="article-create">
                            <dt>是否允许评论：</dt>
                            <el-select class="el-input" v-model="params.is_hidden" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <button class="article-button" type="submit" @click="submit($event)">提 交</button>
                        </div>
                    </form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor';
    import api from '../../api';

    export default {
        components: {
            VueEditor
        },
        data() {
        return {
            params: {
                title: '',
                body: '',
                tag: '',
                is_hidden: 'F'
            },
            options: [
                { value: 'F', label: '是' },
                { value: 'T', label: '否' }
            ],
            tags: '',
            allTags: '',
        }
    },
    beforeCreate() {
        api.get_article(this.$route.params.slug).then((res) => {
            this.tags = res.data.data.tags;
            this.params = res.data.data;
        });
    },
    mounted() {
        api.get_tags().then((res) => {
            this.allTags = res.data.data;
        });
    },
    methods: {
        submit(e) {
            // 判断是否为按了Enter键，防止在输入标签时被提交
            if (e != null && e.keyCode === 13) {
                return;
            }
            this.params.tag = this.tags;
            api.edit_article(this.$route.params.slug, this.params).then((res) => {
                console.log(res.data);
            });
        },
    }
    }
</script>

<style lang="scss" scoped>
    .grid-content {
        width: 100%;
        margin-top: 60px;
    .article-create {
        margin-bottom: 20px;
    dt {
        color: #555;
        padding-top: 5px;
        width: 15%;
        text-align: right;
        float: left;
    }
    .el-input {
        width: 70%;
        margin-left: 2%;
    }
    }
    .article-button {
        cursor: pointer;
        width: 70%;
        margin-left: 17%;
        background-color: #00b5ad;
        color: #fff;
        font-size: 17px;
        padding: 5px 10px 5px 10px;
        border: 1px solid #00b5ad;
        border-radius: 100px;
        box-shadow: none;
    &:hover,
    &:focus,
    &:active {
         color: tomato;
         border: 1px solid tomato;
         box-shadow: none;
         border-radius: 100px;
         background-color: #fff;
     }
    }
    }
</style>