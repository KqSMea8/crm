<template>
    <fb-page :schema="pageView"></fb-page>
</template>
<script>
    /**
     * @file corpList.vue
     * @description 准入模块-机构管理列表
     * @author zengqingzhuang(zengqingzhuang@baidu.com)
     * @since  2017-10-21
     */
    import {components} from 'finbox';
    import shopListViewJson from 'schema/access-apply/shopListView';
    export default {
        data() {
        return {
            pageView: shopListViewJson
        }
    },
    components:{
        FbPage: components.FbPage
    },
    created() {
        //  this.pageView = rateListJson;
    }
    }
</script>
<style type="text/less" lang="less" scoped>

</style>