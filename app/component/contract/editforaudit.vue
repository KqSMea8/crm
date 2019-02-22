<template>
    <fb-page :schema="pageView"></fb-page>
</template>
<script>
    /**
     * @file editforaudit.vue
     * @description 费率编辑页面
     * @author zengqingzhuang(zengqingzhuang@baidu.com)
     * @since  2017-11-24
     */
    import {components} from 'finbox';
    import editforauditJson from 'schema/contract/editforaudit';
    export default {
        data() {
        return {
            pageView: editforauditJson
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