<template>
    <fb-page :schema="pageView"></fb-page>
</template>
<script>
    /**
     * @file rateApproveList.vue
     * @description 费率审核列表
     * @author zengqingzhuang(zengqingzhuang@baidu.com)
     * @since  2017-11-18
     */
    import {components} from 'finbox';
    import rateApproveListJson from 'schema/contract/rateApproveList';
    export default {
        data() {
          return {
                pageView:  rateApproveListJson
            }
        },
        components:{
            FbPage: components.FbPage
        },
        created() {
          //  this.pageView = rateApproveListJson;
        }
    }
</script>
<style type="text/less" lang="less" scoped>
    
</style>