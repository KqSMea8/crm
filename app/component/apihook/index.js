import hookConfig from './hookConfig';
import rate from './hook/rate';
import apply from './hook/apply';
import upload from './hook/upload';
import hostToHost from './hook/hosttohost';

export default {
    // request请求hook,包含before和after两个过程
    hooks: {
        rate,
        apply,
        upload,
        hostToHost
    },
    // 将路由映射到routerHook上
    config: {
        hookConfig
    }
};
