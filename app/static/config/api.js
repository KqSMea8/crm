/**
 * @file api
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 *
 * @since 2017/11/30
 */

import assign from 'object-assign';
import {apify, request} from 'i-apify';
import bizApi from './api-biz';
import formUrlencoded from 'form-urlencoded';
import {token} from 'finbox';

const  OPTION = {
    timeout: 30 * 1000,
    credentials: 'include',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

let api = assign({}, bizApi);
let postHandler = data => {
    token.key = data.csrfToken || '';

    return data;
};
let handler = {
    success: postHandler,
    error: postHandler,
    payload(data, option) {
        if (option['x-method'] !== 'GET') {
            try {
                let payload = JSON.parse(data.body);

                payload = Object.assign({}, payload, {csrfToken: token.key});
                data.body = formUrlencoded(payload);
            }
            catch (e) {
                /*<dev>*/
                console.log(e);
                /*</dev>*/
            }
        }

        return data;
    }
};
let option = Object.assign({}, OPTION, {handler});

export default apify(request.post, api, option);
