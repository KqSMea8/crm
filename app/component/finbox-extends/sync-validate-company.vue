<template>
    <div>
        <el-form>
            <el-input
                    @change="getUpdate"
                    :value = "value"
                    placeholder="请输入内容">
            </el-input>
        </el-form>
    </div>
</template>
<script>

    import finbox from 'finbox';

    import {FbInput} from '/components/finbox/component';

    const URI = '/access/isrepeatcompanyname';

    export default {
        components: {
            FbInput
        },
        methods: {
            getUpdate(value) {
                if ('object' === typeof value) {
                    return false;
                }
                this.model[this.schema.name] = value;
                this.valid();
            },
            async valid() {
                let {
                    company_register_name,
                    company_id,
                    product_id
                } = this.model;

                let {retdata, retmsg} = await finbox.apify(URI)
                    .initApi({
                        company_name: company_register_name,
                        company_id,
                        product_id
                    });

                if (retdata) {
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        type: 'error',
                        message: retmsg
                    });

                    setTimeout(() => this.model[this.schema.name] = '', 1000);
                    return false;
                }
            }
        }
    }
</script>
