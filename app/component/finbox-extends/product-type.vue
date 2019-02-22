<template>
    <div>
        <fb-select :schema="schema">
        </fb-select>
    </div>
</template>
<script>

    import {FbSelect} from '/components/finbox/component';

    const ROOT_URI ='/pcrm/group/access/apply/addforaudit';

    export default {
        components: {
            FbSelect
        },
        created() {
            let option = {
                deep: true
            };

            this.$watch('model.product_id', value => {
                // this.$router.replace({
                //    path: ROOT_URI,
                //    query: {
                //        'product_id': value
                //    }
                // });

                // TODO： FIXME
                if (value !== this.$route.query['product_id']) {
                    location.href = `${ROOT_URI}?product_id=${value}`;
                }
            }, option);
        }
    }
</script>
