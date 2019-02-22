/**
 * @file DP统计配置文件
 */
/* eslint-disable */
var path = location.pathname;
var pageId = path.split('/').filter(function (item) {
    return '' !== item;
}).join('_').toLowerCase();

var pageHash = {
    'alliance_index': '750_1',
    'alliance_loanlist': '750_2',
    'alliance_loaninfo': '750_3',
    'alliance_applybasic': '750_4',
    'alliance_applyinfo': '750_5',
    'alliance_applyupload': '750_6',
    'alliance_applycheck': '750_7',
    'alliance_signbasic': '750_8',
    'alliance_applysupply': '750_9',
    'alliance_signsupply': '750_10'
};

/* 配置需要统计的模块，以及整体的抽样率，不需要的模块不配置即可（可点击上面的模块名称自动隐藏） */
window.alogObjectConfig = {
    sample: '1',
    product: '750',
    page: pageHash[pageId],
    monkey_page: '', 
    speed_page: '', 
    speed: {
        sample: '1'
    },
    monkey: {
        sample: '1'
    },
    exception: { 
        sample: '1'
    },
    feature: {
        sample: '1'
    },
    cus: {
        sample: '1'
    },
    csp: {
        sample: '1',
        'default-src': [
            {match: '*bae.baidu.com', target: 'Accept,Warn'},
            {match: '*.baidu.com,*.bdstatic.com,*.baidustatic.com,*.baiduimg.com,*.bdimg.com,localhost,*.hao123.com,*.hao123img.com', target: 'Accept'},
            {match: /^(127|172|192|10)(\.\d+){3}$/, target: 'Accept'},
            {match: '*', target: 'Accept,Warn'}
        ]
    }
};
void function(a,b,c,d,e,f,g){a.alogObjectName=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=a[e].l||+new Date,d="https:"===a.location.protocol?"https://fex.bdstatic.com"+d:"http://fex.bdstatic.com"+d;var h=!0;if(a.alogObjectConfig&&a.alogObjectConfig.sample){var i=Math.random();a.alogObjectConfig.rand=i,i>a.alogObjectConfig.sample&&(h=!1)}h&&(f=b.createElement(c),f.async=!0,f.src=d+"?v="+~(new Date/864e5)+~(new Date/864e5),g=b.getElementsByTagName(c)[0],g.parentNode.insertBefore(f,g))}(window,document,"script","/hunter/alog/alog.min.js","alog"),void function(){function a(){}window.PDC={mark:function(a,b){alog("speed.set",a,b||+new Date),alog.fire&&alog.fire("mark")},init:function(a){alog("speed.set","options",a)},view_start:a,tti:a,page_ready:a}}();
void function(n){var o=!1;n.onerror=function(n,e,t,c){var i=!0;return!e&&/^script error/i.test(n)&&(o?i=!1:o=!0),i&&alog("exception.send","exception",{msg:n,js:e,ln:t,col:c}),!1},alog("exception.on","catch",function(n){alog("exception.send","exception",{msg:n.msg,js:n.path,ln:n.ln,method:n.method,flag:"catch"})})}(window);