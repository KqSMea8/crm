/**
 * @file bbAccount.js
 * @description 银企直联Event
 * @author zhangxinzhu(zhangxinzhu@baidu.com)
 * @since  2018-01-12
 */

import Cart from '../../static/js/cart';

function showError(msg) {
    this.$message({
        type: 'error',
        message: msg
    });
    return false;
}

export default {
    // 提交审核
    confirmValidate() {
        let receive = this.model;
        let credentialType = receive.credentialType;
        if (credentialType == 1) { // 身份证号
            let regex = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            if (!regex.test(receive.credentialCode)) {
                return showError.call(this, '身份证号格式不正确');
            }
        } else if (credentialType == 2 || credentialType == 3) {
            let regex = /^\d+$/;
            if (!receive.credentialCode) {
                return showError.call(this, '业务凭据编号不能为空');
            }
            if (receive.credentialType != 3 && !regex.test(+receive.credentialCode)) {
                return showError.call(this, '业务凭据编号只能输入数字');
            }
        }
        if (!receive.credentialCode && (receive.credentialType || (receive.confirmType != 5 && receive.confirmType != 6))) {
            return showError.call(this, '业务凭据编号不能为空');
        }
        if (receive.comment && receive.comment.length > 200) {
            return showError.call(this, '认款备注最大长度200');
        }
    },
    mergeList() {
        let storeKey = this.model.amisPages.login_ucid;
        let item = this.elValue;
        let cart = new Cart(storeKey, this);

        cart.setCart(item, this);
    },
    splitbillSubmit() {
        let waitMoney = +this.model.wait_money;

        if (waitMoney > 0) {
            return showError.call(this, '待拆分金额不为0');
        }
        else if (waitMoney === 0) {
            let splitbill = this.model.splitbill;

            if (this.model.splitbill.length < 2) {
                return showError.call(this, '拆单数不能小于两行');
            }

            // 拆分金额的每一项必须大于0
            let flag = true;

            splitbill.forEach(item => {
                if (item.money <= 0) {
                    flag = false;
                    return showError.call(this, '拆分金额不符合规范');
                }
            });

            return flag;
        }
        else if (waitMoney < 0) {
            return showError.call(this, '拆分金额大于总金额');
        }
        else {
            return showError.call(this, '请检查拆分金额');
        }
    }
};
