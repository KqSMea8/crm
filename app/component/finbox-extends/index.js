/**
 * @file finbox-extends/index.js
 * @description 扩展finbox渲染器组件
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 * @since  2017-11-19
 */

import {mixinSchema} from 'finbox/src/mixin';
import rateTable from './rate-table';
import productType from './product-type';
import syncValidateCompany from './sync-validate-company';
import splitBill from './split-bill';
import bbAccountInput from './bbaccount-input';
import cartButton from './cart-button';

const components = {
    'FinboxPcrmRateTable': rateTable,
    'FinboxProductType': productType,
    'FinboxSyncValidateCompany': syncValidateCompany,
    'FinboxSplitBill': splitBill,
    'FinboxAccountInput': bbAccountInput,
    'FinboxCartButton': cartButton
};

export default {
    install: function(vue$) {
        Object.keys(components).forEach(componentName => {
            let component = components[componentName];
            const mixins = component.mixins || [];
            mixins.push(mixinSchema);
            component.mixins = mixins;
            vue$.component(componentName, component);
        });
    }
}
