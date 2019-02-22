<template>
    <fb-page :schema="pageView"></fb-page>
</template>
<script>
    /**
     * @file 银企直联列表页－vue组件
     * @description 银企直联列表页
     * @author zengqingzhuang(zengqingzhuang@baidu.com)
     * @since  2017-12-29
     */

    import {components} from 'finbox';
    import bbAccountListViewJson from 'schema/bb-account/bbAccountList';

    export default {
        data() {
            return {
                pageView: bbAccountListViewJson
            }
        },
        components:{
            FbPage: components.FbPage
        }
    }
</script>
<style type="text/less" lang="less" scoped>

</style>