/**
 * @file fis-conf.js
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 * @since 17/08/31
 */
fis.require('smarty')(fis);
var namespace = 'pcrm';
fis.set('namespace', namespace);
var ignoreList = [
    '*.{md, sh, idea, DS_Store}',
    'BCLOUD',
    'component.json',
    '**/example/*',
    '.git/**'
].join(',');
var es6List = [
    '**.vue:js',
    '**.tpl:js',
    'app/page/**.js',
    'app/schema/**.js',
    'app/static/js/**.js',
    'app/component/**.js',
    'app/static/config/**.js',
    '/app/router.js',
    'components/**.js'
].join(',');
var modList = [
    '/node_modules/**.js', // 因为某些js没有模块化
    '/app/static/config/**.js',
    '/app/static/js/**.js',
    '/app/page/**/**.js',
    '/app/schema/**.js',
    '/app/router.js',
    '/app/component/**.js',
    'components/**.js'
].join(',');
fis
    .hook('commonjs', {
        extList: [
            '.js', '.vue'
        ],
        paths: {
            api: '/app/static/config/api.js',
            vue: '/node_modules/vue/dist/vue.js',
            fontAwesome: '/node_modules/font-awesome/css/font-awesome.min.css',
            schema: '/app/schema',
            component: '/app/component',
            finbox: '/components/finbox/src'
        }
    })
    .hook('node_modules')
    .match('{' + ignoreList + '}', {
        release: false
    })
    .match('/app/test/(**)', {
        release: '/test/${namespace}/app/$1'
    })
    .match('**/api-*.js', {
        postprocessor: function (content, file, settings) {
            return content.replace(/\$\{appName\}/g, namespace);
        }
    })
    .match('**.tpl', {
        extras: {
            isPage: true
        }
    })
    .match('**.vue:jsx', {
        parser: [
            fis.plugin('babel-6.x', {
                presets: ['es2015', 'stage-2'],
                plugins: ['transform-vue-jsx', 'jsx-v-model', 'transform-runtime', 'transform-async-to-generator']
            })
        ]
    })
    .match('**.vue', {
        isMod: true,
        rExt: 'js',
        useSameNameRequire: true,
        parser: [
            fis.plugin('vue2-component', {
                runtimeOnly: true,
                styleNameJoin: '',
                extractCSS: true,
                cssScopedIdPrefix: '_v-',
                cssScopedHashType: 'sum',
                cssScopedHashLength: 8,
                cssScopedFlag: '__vuec__'
            }),
            fis.plugin('babel-6.x', {
                presets: ['es2015','stage-2'],
                plugins: ['transform-runtime', 'transform-async-to-generator']
            })
        ]
    })
    .match('{' + es6List + '}', {
        parser: [
            fis.plugin('babel-5.x', {
                optional: ['es7.decorators', 'es7.classProperties']
            }),
            fis.plugin('babel-6.x', {
                presets: ['es2015','stage-2'],
                plugins: ['transform-runtime', 'transform-async-to-generator']
            })
        ]
    })
    .match('{*.less, **.vue:less}', {
        parser: [
            fis.plugin('less-2.x')
        ],
        rExt: '.css'
    })
    .match('*.{css,less}', {
        preprocessor: fis.plugin('cssprefixer', {
            browsers: [
                'last 2 version', 'safari 5', 'ie 9', 'opera 12.1'
            ],
            cascade: true
        })
    })
    .match('{' + modList + '}', {
        isMod: true,
        rExt: 'js'
    });
fis.media('debug')
    .match('*.{js, less, css, png}', {
        useHash: false,
        useSprite: false,
        optimizer: null
    });
var rdInfo = [
    {
        name: 'liulu',
        path: '/home/users/liulu18/fcrm/crm_odp',
        receiver: 'http://cp01-rdqa-dev380-liulu18.epc.baidu.com:8067/receiver.php'
    },
    {
        name: 'jinna',
        path: '/home/users/xujinna/odp_crm',
        receiver: 'http://cp01-rdqa-dev389-xujinna.epc.baidu.com:8088/receiver.php'
    },
    {
        name: 'wangbo',
        path: '/home/users/wangbo31/odp',
        receiver: 'http://cp01-ps-dev201-wangbo31.epc.baidu.com:8090/receiver.php'
    },
    {
        name: 'wangbo91',
        path: '/home/users/wangbo31/odp_bak',
        receiver: 'http://cp01-ps-dev201-wangbo31.epc.baidu.com:8091/receiver.php'
    },
    {
        name: 'daihongtao',
        path: '/home/users/daihongtao/odp5',
        receiver: 'http://cp01-rdqa-dev106-daihongtao.epc.baidu.com:8007/receiver.php'
    },
    {
        name: 'duxinlong',
        path: '/home/users/duxinlong/ODPs/odp_crm',
        receiver: 'http://cp01-rdqa-dev083-duxinlong.epc.baidu.com:8036/receiver.php'
    },
    {
        name: 'cooperationA',
        path: '/home/work/all_odp/frontA',
        receiver: 'http://gzns-nbg-fpu-aug-c02xi2-76.gzns.baidu.com:8481/receiver.php'
    },
    {
        name: 'cooperationB',
        path: '/home/work/all_odp/frontB',
        receiver: 'http://gzns-nbg-fpu-aug-c02xi2-76.gzns.baidu.com:8482/receiver.php'
    }
];
rdInfo.forEach(function (item) {
    rdConfig(item);
});
function rdConfig(config) {
    var name = config.name;
    var path = config.path;
    var receiver = config.receiver;
    // 潜在问题: 注释，顺序
    fis.media(name)
        .match('**/test/*', {
            release: false
        })
        .match('*.php', {
            release: false
        })
        .match('*.{js,less,css,png}', {
            useHash: true,
            useSprite: false,
            optimizer: false
        })
        .match('*.*', {
            deploy: fis.plugin('http-push', {
                receiver: receiver,
                to: path + '/webroot'
            })
        })
        .match('*.tpl', {
            deploy: fis.plugin('http-push', {
                receiver: receiver,
                to: path
            })
        })
        .match('${namespace}-map.json', {
            release: '$0',
            deploy: fis.plugin('http-push', {
                receiver: receiver,
                to: path + '/data/smarty/config/' + namespace
            })
        });
}
// 3. 测试环境+线上环境
onlineEnv('sendTest');
onlineEnv('prod');
onlineEnv('devOnline');
function onlineEnv(mediaName) {
    fis.media(mediaName)
        .match('::packager', {
            packager: fis.plugin('deps-pack', {
                'static/pkg/js/node_modules.js': /^\/node_modules\/.*\.(js|vue)$/i,
                'static/pkg/js/components/finbox.js': /^\/components\/finbox\/.*\.(js|vue)$/i,
                'static/pkg/css/app.css': /.*\.(less|css)$/i
            })
        });
    // 本地逼真模拟测试环境
    if (mediaName !== 'devOnline') {
        fis.media(mediaName)
            .match('**', {
                deploy: [
                    fis.plugin('skip-packed'),
                    fis.plugin('local-deliver', {
                        to: fis.get('options.dest') || fis.get('options.d') || './output'
                    })
                ]
            });
    }
    // 文件cdn
    if (mediaName === 'prod') {
        fis.media(mediaName)
            .match('*', {
                domain: ['//umoney.bdstatic.com/webroot']
            })
            .match('*.tpl', {
                domian: false
            });
    }
}
