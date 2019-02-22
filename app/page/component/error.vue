<template>
    <div v-if="id != 404" class="errPage-container">
        <el-button @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button>
        <el-row>
            <el-col :span="12">
                <h1 class="text-jumbo text-ginormous">Oops!</h1>
                <h2>{{ msg }}</h2>
                <h6>请联系管理员开通权限，或者您可以去:</h6>
                <ul class="list-unstyled">
                    <li class="link-type">
                        <a href="/access/index">首页</a>
                    </li>
                </ul>
            </el-col>
            <el-col :span="12">
                <img src="../imgs/401.gif" width="313" height="428" alt="Girl has dropped her ice cream.">
            </el-col>
        </el-row>
  </div>
  <div v-else-if="id == 404">
      <error_404></error_404>
  </div>
</template>
<script>
    /**
     * @file error.vue
     * @author: zengqingzhuang(zengqingzhuang@baidu.com)
     * @description 错误页面
     * @since: 2017-10-27
     */
    import error_404 from './404';
    export default {
        data() {
            return {
                msg: this.$route.query.msg || '系统内部错误',
                id: this.$route.params.id
            }
        },
        components: {
            error_404
        },
        methods: {
            back() {
                window.location.href = '/access/index';
            }
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    .errPage-container {
        width: 800px;
        margin: 100px auto;
        .pan-back-btn {
            background: #008489;
            color: #fff;
        }
        .el-col {
            h1 {
                margin: 40px 0;
            }
            h2 {
                margin: 20px 0;
                font-weight: 600;
                font-size: 25px;
            }
            h6 {
                margin: 20px 0;
                font-size: 12px;
                font-weight: 500;
            }
        }
        .pan-img {
            display: block;
            margin: 0 auto;
        }
        .text-jumbo {
            font-size: 60px;
            font-weight: 700;
            color: #484848;
        }
        .list-unstyled {
            font-size: 14px;
            padding: 5px 0 5px 40px;
            li {
                padding-bottom: 5px;
                list-style: disc;
            }
            a {
                color: #008489;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>