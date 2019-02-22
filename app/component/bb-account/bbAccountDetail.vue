<template>
    <fb-page :schema="pageView"></fb-page>
</template>
<script>
    /**
     * @file 银企直联详情页－vue组件
     * @description 银企直联详情页
     * @author zengqingzhuang(zengqingzhuang@baidu.com)
     * @since  2017-01-05
     */

    import {components} from 'finbox';
    import bbAccountListViewJson from 'schema/bb-account/bbAccountDetail';

    export default {
        data() {
            return {
                pageView: bbAccountListViewJson
            }
        },
        components:{
            FbPage: components.FbPage
        },
        created() {
        }
    }
</script>
<style type="text/less" lang="less" scoped>

</style>