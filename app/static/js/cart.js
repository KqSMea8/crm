/**
 * @file cart
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 *
 * @since 2018/1/12
 */

import store from 'store';
import _ from 'lodash';

export default
class Cart {
    constructor(key, vm) {
        this.key = this.getKey(key);
        this.vm = vm;
        this.list = [];

        let stores = store.get(this.key);

        if (Array.isArray(stores)) {
            this.list = stores;
        }
        else if (_.isObject(stores)) {
            this.list.push(stores);
        }

        if (this.list.length) {
            this.store();
        }
    }
    getKey(key) {
        return `_prcm_user_cart_key_${key}`;
    }
    setCart(item) {
        if (_.find(this.list, item))  {
            this.showMessage('该条数据已存在');

            return false;
        }

        // 没找到和当前数据相同的acctnum
        if (this.list.length > 0 && this.list.filter(store => store.acctnum === item.acctnum).length === 0) {
            this.showMessage('只有来自同一个收款帐号的收款记录才能合并到一起');

            return false;
        }

        this.list.push(item);

        this.store();
        this.showMessage('数据保存成功', 'success');
    }
    store(data) {
        let list = data || this.list;
        let model = this.vm.model;
        this.vm.$set(model, 'customCart', {
            list: list,
            show: list.length > 0,
            total: list.reduce((acc, item) => (+item.bill_money) + acc, 0).toFixed(2),
            length: list.length
        });
        // model.customCart = {
        //     list: list,
        //     show: list.length > 0,
        //     total: list.reduce((acc, item) => (+item.bill_money) + acc, 0).toFixed(2),
        //     length: list.length
        // };

        store.set(this.key, list);
    }
    showMessage(message, type = 'error') {
        this.vm.$message({
            type,
            message
        });
    }
}
