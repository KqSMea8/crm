/**
 * @file slitbill
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 *
 * @since 2018/1/12
 */

export default {
    splitaccount: {
        before: data => {
            let billMoney = data.arr_bill_moneys;
            let arrBillMoney = billMoney.map((item, index) => {
                return +(parseFloat(item.money).toFixed(2));
            });
            data['arr_bill_money'] = arrBillMoney;
            delete data['arr_bill_moneys'];
            return data;
        },
        after: data => {
            return data;
        }
    },
    accountCancel: {
        before: data => {
            return data;
        },
        after: data => {
            if (data.status === 0 && data.data) {
                data.data.isCancel = true;
            }
            return data;
        }
    },
    accountDetail: {
        before: data => {
            return data;
        },
        after: data => {
            if (data.status === 0 && data.data) {
                data.data.isCancel = false;
            }
            return data;
        }
    },
    getAccountList: {
        before: data => {
            if (data.customCart) {
                delete data.customCart;
            }
            return data;
        },
        after: data => {
            return data;
        }
    }

};
