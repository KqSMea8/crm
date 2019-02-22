/**
 * @file rate
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 * @description 费率模块格式化数据
 * @since 2017/12/22
 */
import _ from 'lodash';
export default {
    // 费率表单页数据处理
    handlerRateData: {
        before(data) {
            return data;
        },
        after(data) {
            let result = data.data;
            // 处理详情页表格数据
            result.rateDetailTableData = [];
            let paymentRateInfo = result.paymentRateInfo;
            if (!result.priceMultiplierSwitch) { // 是否开启浮动定价
                result.priceMultiplierSwitch = '0';
            }
            if (paymentRateInfo) {
                result.delayRepaymentDays = paymentRateInfo.applyInfo.delayRepaymentDays;
                if (!result.delayRepaymentDays || result.delayRepaymentDays === '0') {
                    result.delayRepaymentDays = 40;
                }
                result.minAmountCharge = paymentRateInfo.applyInfo.minAmountCharge;
                if (result.minAmountCharge == 0) {
                    result.minAmountCharge = '';
                }
                result.maxAmountCharge = paymentRateInfo.applyInfo.maxAmountCharge;
                if (result.maxAmountCharge == 0) {
                    result.maxAmountCharge = '';
                }
            }
            if (paymentRateInfo && paymentRateInfo.rateList.length > 0) {
                paymentRateInfo.rateList.forEach(rate => {
                    let newRate = _.cloneDeep(rate);
                    let paymentInfo = newRate.paymentInfo;
                    let trainList = paymentInfo.trainList;
                    let industryName = [];
                    delete paymentInfo.subPaymentInfo;
                    // 行业
                    if (trainList) {
                        Object.keys(trainList).forEach(key => {
                            if (trainList[key].checked && result.trainList) {
                                let train = result.trainList[key];
                                if (train) {
                                    train.oneName && industryName.push(train.oneName);
                                    train.twoName && industryName.push(train.twoName);
                                    train.threeName && industryName.push(train.threeName);
                                }
                            }
                        });
                    }
                    paymentInfo.customerLevel = -1;
                    paymentInfo.customerLevelName = paymentInfo.customerLevel;
                    if (result.priceMultiplierSwitch == 1) { // 开启浮动定价
                        paymentInfo.customerLevelName = '基础定价';
                    } else {
                        paymentInfo.customerLevelName = '无';
                    }
                    paymentInfo.industryLabel = industryName.join(' ');
                    paymentInfo.strTrain = Object.keys(trainList);
                    // 还款类型
                    paymentInfo.repaymentTypeName = result.repaymentType[paymentInfo.repaymentType].name || '空';
                    // IRR是否标红显示
                    if (paymentInfo.irr_forbid_lower_limit || paymentInfo.irr_forbid_upper_limit || paymentInfo.irr_warning_lower_limit || paymentInfo.irr_warning_upper_limit) {
                        paymentInfo.IRRRed = true;
                    }
                    result.rateDetailTableData.push(paymentInfo);
                    // 医美贷不显示子节点数据
                    if (result.productId !== 'YMD' && rate.paymentInfo.subPaymentInfo) {
                        let subKeys = Object.keys(rate.paymentInfo.subPaymentInfo);
                        if (subKeys.length > 0) {
                            subKeys.forEach(key => {
                                let subObj = rate.paymentInfo.subPaymentInfo[key];
                                subObj.customerLevelName = subObj.customerName ? subObj.customerName : subObj.customerLevel;
                                subObj.IRRRed = false;
                                if (subObj.irr_forbid_lower_limit || subObj.irr_forbid_upper_limit || subObj.irr_warning_lower_limit || subObj.irr_warning_upper_limit) {
                                    subObj.IRRRed = true;
                                }
                                result.rateDetailTableData.push(_.assign({}, paymentInfo, subObj));
                            });
                        }
                    }
                });
            }
            // 处理费率使用行业数据
            if (result.trainList) {
                result.trains = [];
                Object.keys(result.trainList).forEach(key => {
                    let train = result.trainList[key];
                    let industryName = [];
                    if (train) {
                        train.oneName && industryName.push(train.oneName);
                        train.twoName && industryName.push(train.twoName);
                        train.threeName && industryName.push(train.threeName);    
                    }
                    result.trains.push({
                        label: industryName.join(' '),
                        value: key
                    });
                });
            }
            // 是否允许部分退款
            if (result.is_section_refund) {
                result.is_section_refund.forEach(item => {
                    item.value = item.metaCode;
                    item.label = item.name;
                });
            }
            // 格式化费率类型数据
            if (result.applyType) {
                result.applyTypes = [];
                Object.keys(result.applyType).forEach(key => {
                    let obj = result.applyType[key];
                    result.applyTypes.push({
                        label: obj.name,
                        value: obj.metaCode
                    });
                });
                result.applyType = null;
            }
            // 退款类型
            if (result.refundType) {
                result.refundTypes = [];
                Object.keys(result.refundType).forEach(key => {
                    let obj = result.refundType[key];
                    result.refundTypes.push({
                        label: obj.name,
                        value: obj.metaCode
                    });
                });
                result.refundType = null;
            }
            // 贴息撤销类型
            if (result.amortizationType) {
                result.amortizationTypes = [];
                Object.keys(result.amortizationType).forEach(key => {
                    let obj = result.amortizationType[key];
                    result.amortizationTypes.push({
                        label: obj.name,
                        value: obj.metaCode
                    });
                });
                result.amortizationType = null;
            }
            // 分期类型
            if (result.repaymentType) {
                result.repaymentTypes = [];
                Object.keys(result.repaymentType).forEach(key => {
                    let obj = result.repaymentType[key];
                    result.repaymentTypes.push({
                        label: obj.name,
                        value: obj.metaCode
                    });
                });
                result.repaymentType = null;
            }
            // 处理上传文件数据
            if (result.file) {
                Object.keys(result.file).forEach(key => {
                    let array = this.formatFileData(result.file[key]);
                    if (key == 0) { // 其它附件
                        result.fileOther = array;
                    } else if (key == 1) { // 联系人授权书
                        result.fileAuth = array;
                    } else if (key == 2) { // 联系人身份证
                        result.fileIdentity = array;
                    } else if (key == 3) { // 补充协议
                        result.fileProtocol = array;
                    } else if (key == 4) { // IRR特批邮件
                        result.fileIRR = array;
                    }
                });  
            }
            return data;
        },
        formatFileData(data) {
            let array = [];
            data.forEach(item => {
                let obj = {};
                obj.key = item.key;
                obj.filename = item.fileName;
                obj.url = item.src;
                obj.type = item.type;
                array.push(obj);
            });
            return array;
        }
    },
    // 费率审核列表页-批量通过,费率表单审核页-驳回修改、审核通过
    applyApproveData: {
        before(data) {
            if (data.page === 'rateForm') {
                this.approvePage = data.page;
                delete data.page;
            }
            return data;
        },
        after(data) {
            // 驳回修改、审核通过
            if (this.approvePage === 'rateForm') {
                return data;
            }
            // 批量通过
            let msgHtml = [];
            let result = data.data;
            Object.keys(result).forEach((key, index) => {
                if (index === Object.keys(result).length - 1) {
                    msgHtml.push(`<div style="color:#000;">${key}:${result[key]}</div>`);
                } else {
                    msgHtml.push(`<div style="margin-bottom:10px;color:#000;">${key}:${result[key]}</div>`);
                }
            });
            data.msg = msgHtml.join('');
            return data;
        }
    },
    // 费率表单页保存功能
    savePaymentApply: {
        before(data) {
            // 解析上传附件数据
            data.file = {};
            let fileKey = '';
            if (data.fileOther) {
                data.file[0] = this.resolverFileData(data.fileOther);
            }
            if (data.fileAuth) {
                data.file[1] = this.resolverFileData(data.fileAuth);
            }
            if (data.fileIdentity) {
                data.file[2] = this.resolverFileData(data.fileIdentity);
            }
            if (data.fileProtocol) {
                data.file[3] = this.resolverFileData(data.fileProtocol);
            }
            if (data.fileIRR) {
                data.file[4] = this.resolverFileData(data.fileIRR);
            }
            delete data.fileOther;
            delete data.fileAuth;
            delete data.fileIdentity;
            delete data.fileProtocol;
            delete data.fileIRR;
            return data;
        },
        after(data) {
            return data;
        },
        resolverFileData(files) {
            let array = [];
            files.forEach(file => {
                let obj = {};
                obj.key = file.key;
                obj.filename = file.filename;
                obj.src = file.url;
                obj.type = file.type;
                array.push(obj);
            });
            return array;
        }
    }
};