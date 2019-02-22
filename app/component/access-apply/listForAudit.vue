<template>
    <fb-page :schema="pageView"></fb-page>
</template>
<script>
    /**
     * @file listForAudit.vue
     * @description 准入模块-准入申请列表
     * @author  zengqingzhuang(zengqingzhuang@baidu.com)
     * @since  2017-10-21
     */
    import {components} from 'finbox';
    import listForAuditJson from 'schema/access-apply/listForAudit';
    export default {
        data() {
        return {
            pageView: listForAuditJson
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