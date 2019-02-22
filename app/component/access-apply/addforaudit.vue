<template>
    <fb-page :schema="pageView"></fb-page>
</template>
<script>
    /**
     * @file addforaudit.vue
     * @description apply entry
     * @author zengqingzhuang(zengqingzhuang@baidu.com)
     * @since  2017-10-21
     */

    import {components} from 'finbox';

    import DXJ from 'schema/access-apply/addforaudit';
    import JCD from 'schema/access-apply/applyBuilding';
    import JZD from 'schema/access-apply/applyHome';
    import YMD from 'schema/access-apply/applyMedical';
    import ZFD from 'schema/access-apply/addHomeRent';

    export default {
        data() {
            return {
                pageView: {}
            }
        },
        components:{
            FbPage: components.FbPage
        },
        created() {
            /**
             *  我们的链接规则应该是 /access/apply/addforaudit<?productId=:id>
             *  解析规则如下：
             *  1.默认为edu
             *  2.如果有对应schema 使用对应数据
             *  2.如果没有默认为EDU
             */

            let productMap = {
                DXJ,
                YMD,
                JZD,
                JCD,
                ZFD
            };
            let schema = DXJ;

            let {product_id = ''} = this.$route.query;

            if (productMap[product_id]) {
                schema = productMap[product_id];
            }

            this.$set(this.$data, 'pageView', schema);
        }
    }
</script>
<style type="text/less" lang="less" scoped>

</style>