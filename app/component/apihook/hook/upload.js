/**
 * @file upload
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 *
 * @since 2017/12/22
 */

export default {
    upload: {
        before(data) {

        },
        after(data) {
            let {retno, retdata, retmsg} = data;

            return {
                status: retno,
                data: retdata,
                msg: retmsg
            };
        }
    }
};
