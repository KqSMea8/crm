<template>
    <fb-page :schema="pageView" class="pcrm-self-rate"></fb-page>
</template>
<script>
    /**
     * @file rateApproveList.vue
     * @description 自主支付息费列表
     * @author zengqingzhuang(zengqingzhuang@baidu.com)
     * @since  2017-11-18
     */
    import {components} from 'finbox';
    import selfPayRateListJson from 'schema/contract/selfPayRateList';
    export default {
        data() {
          return {
                pageView: selfPayRateListJson
            }
        },
        components:{
            FbPage: components.FbPage
        }
    }
</script>
<style type="text/less" lang="less">
    .pcrm-self-rate {
        .el-dialog__body {
            .el-form-item {
                margin-bottom: 0;
            }
        }
    }
</style>