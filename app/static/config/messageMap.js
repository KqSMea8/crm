import finbox from 'finbox';
import Vue from 'vue';

export default {
    force: function() {
        Vue.use(finbox.messageMap, {
            // 需要处理的状态值范围(不得有交叉段)
            statusRange: [{begin:0, end:300000}],
            // 不需要处理的状态值
            ignoreStatus:[200,330,555],
            // 用户自定义消息提示体
            userMap:[
                {
                    status: 2000,
                    title: '操作提示',
                    msg: '没有操作权限！', // 提示消息, 默认使用接口返回
                    level: 'error',  // success / info / warning / error  默认info
                    action:{
                        type: 'info', // 同level
                        message: '没有操作权限！' // 悬浮提示框
                    }
                },
                {
                    status: 2001,
                    msg: '未登录！',
                    level: 'error',
                    action:{
                        type: 'info',
                        message: '请登录'
                    },
                    redirect: {url: '/access/login'}
                }

            ]
        });
    }
}