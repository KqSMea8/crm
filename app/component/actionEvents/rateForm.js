/**
 * @file index.js
 * @description 费率表单
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 * @since  2017-12-20
 */
// 错误提示
function showError(msg) {
    this.$message({
        type: 'error',
        message: msg
    });
    return false;
}
export default {
    // 提交审核
    rateSubmitApprove() {
        let model = this.model;
        let tableData = model.rateDetailTableData;
        let irrError = false;
        if (tableData.length <= 0) {
            return showError.call(this, '分期不能为空');
        }
        for (let i = 0; i < tableData.length; i++) {
            let rate = tableData[i];
            if (rate.irr_forbid_lower_limit || rate.irr_forbid_upper_limit) {
                irrError = true;
                return showError.call(this, 'IRR已经超过允许提交范围');
            }
        }
        if (irrError) return;
        if (!model.priceMultiplierPolicyId) {
            return showError.call(this, '浮动定价策略不能为空');
        }
        if (model.minAmountCharge && model.maxAmountCharge && (model.maxAmountCharge < model.minAmountCharge)) {
            return showError.call(this, '最高分期手续费应高于最低分期手续费');
        }
    },
    // 驳回修改
    rejectUpdate() {
        if (!this.model.audit_note) {
            return showError.call(this, '审批备注不能为空');
        }
    },
    // 解锁
    openLock() {
        this.model.openLock = 1;
        return false;
    }
};