<template>
    <div>
        <el-input @blur="searchCode">
        </el-input>
    </div>
</template>
<script>
    import finbox from 'finbox';
    export default {
        data() {
            return {
            }
        },
        methods: {
            async searchCode(event) {
                let model = this.model;
                let params = {
                    account_code: this.dialogInfo.model.account_no,
                    credential_code: event.target.value
                };
                if (model.confirmType != 2 || !params.credential_code) return;
                let res = await finbox.apify('/account/api/getuserinfobycredentialcode').initApi(params);
                Object.assign(this.model, res.data, {credentialCode: event.target.value});
            }
        }
    }
</script>
