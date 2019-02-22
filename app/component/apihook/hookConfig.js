export default {
    general: {
        // 费率审核列表批量通过
        '/contract/api/approvalpaymentrateinfo': {
            'hook': 'rate',
            'action': 'applyApproveData'
        },
        // 费率表单编辑页
        '/contract/paymentrateinit': {
            'hook': 'rate',
            'action': 'handlerRateData'
        },
        // 费率表单查看页
        '/contract/paymentrateinfodetail': {
            'hook': 'rate',
            'action': 'handlerRateData'
        },
        // 费率表单审核页
        '/contract/paymentrateaudit': {
            'hook': 'rate',
            'action': 'handlerRateData'
        },
        // 费率表单保存功能
        '/contract/api/savepaymentapply': {
            'hook': 'rate',
            'action': 'savePaymentApply'
        },

        // 准入申请过滤
        '/access/reviewsubmit': {
            'hook': 'apply',
            'action': 'applyAuditSubmit'
        },
        '/access/api/applysave': {
            'hook': 'apply',
            'action': 'applyAuditSubmit'
        },
        '/access/apply/infoforaudit': {
            'hook': 'apply',
            'action': 'applyInfoList'
        },

        '/access/imageupload': {
            'hook': 'upload',
            'action': 'uploadFile'
        },
        // 银企直联拆单
        '/account/api/splitaccount': {
            'hook': 'hostToHost',
            'action': 'splitaccount'
        },
        '/account/api/accountcancel': {
            'hook': 'hostToHost',
            'action': 'accountCancel'
        },
        '/account/api/getaccountdetail': {
            'hook': 'hostToHost',
            'action': 'accountDetail'

        },
        '/account/api/getaccountlist': {
            'hook': 'hostToHost',
            'action': 'getAccountList'
        }

    },
    userLogic: function() {

    }
};
