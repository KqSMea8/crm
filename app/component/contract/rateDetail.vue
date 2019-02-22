<template>
    <fb-page :schema="pageView" class="pcrm-rate-detail"></fb-page>
</template>
<script>
    /**
     * @file rateDetail.vue
     * @description 费率详情页
     * @author zengqingzhuang(zengqingzhuang@baidu.com)
     * @since  2017-12-7
     */
    import {components} from 'finbox';
    import url from 'url';
    import queryString from 'query-string';
    import rateDetailJson from 'schema/contract/rateDetail';
    export default {
        data() {
          return {
                pageView: ''
            }
        },
        created() {
            let query = queryString.parse(url.parse(location.href).query);
            if (!query.companyId) {
                query.companyId = '';
            }
            if (!query.paymentApplyCode) {
                query.paymentApplyCode = '';
            }
            switch(query.operationType) {
                case '1': // 新建页
                    rateDetailJson.initApi = `/contract/paymentrateinit?operationType=1&companyId=${query.companyId}&isApi=true`;
                    break;
                case '2': // 编辑页
                    rateDetailJson.initApi = `/contract/paymentrateinit?operationType=2&companyId=${query.companyId}&isApi=true`;
                    break;
                case '3': // 查看页
                    rateDetailJson.initApi = `/contract/paymentrateinfodetail?operationType=3&paymentApplyCode=${query.paymentApplyCode}&isApi=true`;
                    break;
                case '4': // 审核页
                    rateDetailJson.initApi = `/contract/paymentrateaudit?operationType=4&paymentApplyCode=${query.paymentApplyCode}&isApi=true`;
                    break;
                default: 
                    rateDetailJson.initApi = `/contract/paymentrateinit?operationType=1&companyId=${query.companyId}&isApi=true`;
            }
            this.pageView = rateDetailJson;
        },
        components:{
            FbPage: components.FbPage
        }
    }
</script>
<style type="text/less" lang="less">
</style>