/**
 * @file applyHook
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 *
 * @since 2017/12/22
 */

import cleanDeep from 'clean-deep';

let filterJZD = function (data) {
    if (data['fit_project_content']) {
        data['fit_project_content'] = JSON.stringify(data['fit_project_content']);
    }

    return data;
};

let filterCompetitiveInfo = function(data) {

    if (data.competitiveInfo1) {
        data['competitiveInfo'] =[];
    }
    if (data.competitiveInfo1) {
        data['competitiveInfo'][0] = JSON.stringify(data.competitiveInfo1);
        delete  data.competitiveInfo1;
    }
    if (data.competitiveInfo2) {
        data['competitiveInfo'][1] = JSON.stringify(data.competitiveInfo2);
        delete  data.competitiveInfo2;
    }

    return data;
}

let filterTrainTypeLevel = function(data){
    data.train_type_level_one =  data.trainTypeLevelOTT[0];
    data.train_type_level_two = data.trainTypeLevelOTT[1];
    data.train_type_level_three = data.trainTypeLevelOTT[2];
    delete data.trainTypeLevelOTT;

    data.trainTypeLevel =JSON.parse(data.trainTypeLevels).map(function(item){
        return {
            train_type_level_one:item.trainTypeLevel[0],
            train_type_level_two:item.trainTypeLevel[1],
            train_type_level_three:item.trainTypeLevel[2]
        }
    });

    delete data.trainTypeLevels;

    return data;
}



export default {
    // 准入申请提交过滤
    applyAuditSubmit: {
        before(data) {
            let exclude = [
                'credentials_due_date_select',
                'owner_identity_due_date_select'
            ];
            // prepare

            data = filterJZD(data);
            data = filterCompetitiveInfo(data);
            data = filterTrainTypeLevel(data);

            data = cleanDeep(data);
            Object.keys(data)
                .forEach(key => {
                    // delete custom key
                    if (exclude.includes(key)) {
                        delete data[key];
                    }

                    // boolean to Int
                    if ('boolean' === typeof data[key]) {
                        data[key] = Number(data[key]);
                    }
                });


            /* eslint-disable */
            let [register_province, register_city] = data['province_city'] || [];

            delete data['province_city'];

            data = Object.assign({}, data, {register_city, register_province});
            /* eslint-enable */

            return data;
        },
        after(data) {
            return data;
        }
    },
    applyInfoList: {
        before(response) {
            return response;
        },
        after(response) {

            let model = Object.assign({}, response.data.companyForauditData);

            // 竞品合作信息 combo数据格式转换
            if(model.cooperate_institutions_num > 0) {
                model.competitiveInfo1 = JSON.stringify(model.competitiveInfo[0]);
            }
            if(model.cooperate_institutions_num > 1) {
                model.competitiveInfo2 = JSON.stringify(model.competitiveInfo[1]);
            }
            delete model.competitiveInfo;
            // 机构类别 （主行业）
            model.trainTypeLevelOTT = [model.train_type_level_one, model.train_type_level_two, model.train_type_level_three];
            delete model.train_type_level_one;
            delete model.train_type_level_two;
            delete model.train_type_level_three;



            const trainTypeLevels = model.trainTypeLevel.map(function(item){

                return  {trainTypeLevel: [item.train_type_level_one, item.train_type_level_two, item.train_type_level_three]};
            });
            delete model.trainTypeLevel;
            model.trainTypeLevels = JSON.stringify(trainTypeLevels);


            // 省市
            model.province_city = [model.register_province,model.register_city];
            delete model.register_province;
            delete model.register_city;



                delete response.data.companyForauditData;

            response.data = Object.assign({}, response.data, model);
            return response;
        }
    }
};
