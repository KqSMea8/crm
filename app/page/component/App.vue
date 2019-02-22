<template>
    <div :class="{hideSideBar: isCollapse}" @click="appClick">
        <div class="app-left">
            <div class="app-header">
                <span v-if="isCollapse" class="title-collapse"></span>
                <span v-else class="title"></span>
            </div>
            <div class="app-menu">
                <menulist class="menu-list" :isCollapse="isCollapse"></menulist>
            </div>
        </div>
        <div class="app-right">
            <div class="app-header">
                <a class="toggle">
                    <i class="fa fa-outdent fa-fw" :class="{rotate: isCollapse}" @click="toggleMenu"></i>
                </a>
                <el-breadcrumb separator="/" class="breadcrumb">
                    <template v-for="(item, index) in this.breadcrumbData">
                        <!-- <el-breadcrumb-item :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item> -->
                        <el-breadcrumb-item>{{item.name}}</el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
                <div class="nav-info">
                    <ul>
                        <li>
                            <a href="javascript:void(0)">
                                <i style="font-size: 16px;" class="fa fa-arrows-alt" @click="fullScreen"></i>
                            </a>
                        </li>
                        <li class="user-drop-down">
                            <a @click.stop="showUserInfo" href="javascript:void(0)">
                                <span>{{userInfo.account}}</span>
                                <!-- <b class="caret"></b>
                                <img src="../imgs/default.jpg" alt=""> -->
                            </a>
                            <a @click="outLogin" href="javascript:void(0)">退出</a>
                            <!-- <ul class="info" :class="{show: isShowInfo}">
                                <li>
                                    <a @click="redirectFirstPage" href="javascript:void(0)">首页</a>
                                </li>
                                <li>
                                    <a @click="fullScreen" href="javascript:void(0)">全屏显示</a>
                                </li>
                                <li>
                                    <a @click="outLogin" href="javascript:void(0)">退出</a>
                                </li>
                            </ul> -->
                        </li>
                    </ul>
                </div>
            </div>
            <section class="app-content">
                <template v-if="$route.path == prefix">
                    <home></home>
                </template>
                <template v-else-if="$route.meta.keepAlive">
                    <keep-alive>
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </keep-alive>
                </template>
                <template v-else>
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </template>
            </section>    
        </div>
        <footer class="app-footer">
            百度金融中台管理系统
        </footer>
    </div>
</template>
<script>
    /* @file App.vue
     * @author: zengqingzhuang(zengqingzhuang@baidu.com)
     * @description 路由承载页
     * @since: 2017-10-17
     */
    import menulist from './menuList.vue';
    import home from './home.vue';
    import screenfull from 'screenfull';
    import api from 'api';
    export default {
        data() {
            return {
                prefix: '/', // 路由前缀
                isCollapse: false, // 展开、隐藏menu
                isShowInfo: false, // 展示tip
                userInfo: {}, // 用户信息
                breadcrumbData: [] // 面包屑数据
            }
        },
        methods: {
            updateBeadCrumb() {
                let breadcrumbData = [];
                this.$route.matched.forEach(item => {
                    if (!item.name) return;
                    let {name, path} = item;
                    !path && (path = this.prefix);
                    breadcrumbData.push({
                        name,
                        path
                    })
                });
                this.breadcrumbData = breadcrumbData;
            },
            showUserInfo() {
                this.isShowInfo = this.isShowInfo ? false : true;
            },
            // 跳转首页
            redirectFirstPage() {
                this.isShowInfo = false;
                window.location.href = '/access/index';
            },
            // 退出登录
            outLogin() {
                this.isShowInfo = false;
                //this.$router.push('/login');
                let href = '//cas.baidu.com/?action=logout&u=http%3A%2F%2Ffcrm.baidu.com%2Faccess%2Flogin'; // 线上地址
                if (window.location.href.indexOf('fcrm.baidu.com') === -1) {
                    href = '//cas-off.baidu.com:8477/?action=logout&u=http%3A%2F%2Fcp01-rdqa-dev358.cp01.baidu.com%3A8088%2Faccess%2Flogin';
                }
                window.location.href = href;
            },
            // 显示和隐藏左侧菜单
            toggleMenu() {
                this.isCollapse = this.isCollapse ? false : true;
            },
            // 全屏显示
            fullScreen() {
                screenfull.toggle();
            },
            appClick() {
                this.isShowInfo = false;
            }
        },
        async created() {
            this.prefix = this.$router.options.routes[0].path;
            this.updateBeadCrumb();
            let fullPath = window.location.href;
            let [userInfo, userPerm] = await Promise.all([
                api.getUserInfo(),
                api.checkUserPerm({url: this.$route.path})
            ]);
            // 登录校验
            let data = userInfo.data;
            if (data.status === 0) { // 登录成功
                this.userInfo = data.data;
            } else if (data.status === 2001) { // 未登录
                //return this.$router.push({path: '/login'});
                return window.location.href = '/access/login?fromu=' + encodeURIComponent(fullPath);
            } else {
                return this.$router.push({path: `${this.prefix}/error/${data.status}?msg=${data.msg}`});
            }
            // 页面权限校验
            data = userPerm.data;
            if (data.status === 2001) { // 未登录
                //return this.$router.push({path: '/login'});
                return window.location.href = '/access/login?fromu=' + encodeURIComponent(fullPath);
            } else if (data.status !== 0 || !data.data.isCan) { // 报错、无当前页面或要访问的页面权限
                if (!data.data.isCan) {
                    data.msg = '您没有权限访问此页面';
                }
                return this.$router.push({path: `${this.prefix}/error/${data.status}?msg=${data.msg}`});
            }
        },
        watch: {
            $route() {
               this.updateBeadCrumb();
            }
        },
        components: {
            home,
            menulist
        }
    }
</script>
<style type="text/less" lang="less">
    .app-left {
        .app-header {
            font-weight: bold;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: #324057;
            color: #FFFFFF;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2000;
            width: 240px;
            transition: width .28s ease-out;
            .title {
                vertical-align: middle;
                display: inline-block;
                width: 140px;
                height: 21px;
                background: url(../imgs/gstone-logo.png) no-repeat;
                background-size: contain;
            }
            .title-collapse {
                vertical-align: middle;
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url(../imgs/g-logo.png) no-repeat;
                background-size: contain;
            }
        }
        .app-menu {
            position: fixed;
            top: 50px;
            bottom: 0;
            z-index: 1001;
            width: 240px;
            background-color: #324057;
            transition: width .28s ease-out;
            overflow: hidden;
        }
        .menu-list {
            width: 255px;
            position: relative;
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .el-menu {
                width: 240px;
                border-right: none;
                background-color: #1F2D3D;
            }
            > .el-menu {
                background-color: #324057;
            }
            .el-menu-item,.el-submenu__title {
                color: #C0CCDA;
                &:hover {
                    background-color: #475669;    
                }
            }
            .el-menu-item.is-active {
                color: #C0CCDA;
                background-color: #475669;
            }
            &::-webkit-scrollbar {
                display:none
            }
        }
    }
    .app-right {
        height: 100%;
        margin-top: 50px;
        margin-left: 240px;
        transition: margin-left .28s ease-out;
        .app-header {
            transition: left .28s ease-out;
            display: flex;
            align-items: center;
            height: 50px;
            background-color: #FFFFFF;
            box-shadow: 0 2px 2px rgba(0,0,0,.05), 0 1px 0 rgba(0,0,0,.05);
            color: #324057;
            position: fixed;
            right: 0;
            left: 240px;
            top: 0;
            z-index: 1000;
            .breadcrumb {
                float: left;
                font-size: 14px;
                color: #58666e;
                margin-left: 5px;
            }
            .nav-info {
                position: absolute;
                right: 0px;
                color: #58666e;
                font-size: 14px;
                .out-login {
                    color: #58666e;
                    text-decoration: none;
                    margin-left: 24px;
                }
                li {
                    float: left;
                    line-height: 50px;
                    padding: 0 10px;
                }
                a {
                    padding: 15px 5px;
                }
                .user-drop-down {
                    position: relative;
                    img {
                        width: 40px;
                        height: 40px;
                        vertical-align: middle;
                        border-radius: 500px;
                    }
                    .caret {
                        display: inline-block;
                        width: 0;
                        height: 0;
                        margin-left: 2px;
                        vertical-align: middle;
                        border-top: 4px dashed;
                        border-top: 4px solid \9;
                        border-right: 4px solid transparent;
                        border-left: 4px solid transparent;
                    }
                    .info {
                        position: absolute;
                        right: 0px;
                        top: 50px;
                        background-color: #fff;
                        border-radius: 2px;
                        box-shadow: 0 2px 6px rgba(0,0,0,.1);
                        border: 1px solid #dee5e7;
                        display: none;
                        li {
                            min-width: 160px;
                            a {
                                padding: 5px 15px;
                                display: block;
                                clear: both;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #333;
                                white-space: nowrap;
                                min-width: 160px;
                            }
                            &:hover {
                                background-color: #edf1f2!important;
                            }
                            &:last-child {
                                padding: 5px 10px;
                                border-top: 1px solid #e5e5e5;
                            }
                        }
                    }
                    .show {
                        display: block;
                    }
                }
            }
            .toggle {
                line-height: 50px;
                padding: 0 10px;
                float: left;
                transition: all .38s ease-out;
            }
            .rotate {
                transform: rotate(-90deg);
            }
        }
        .app-content {
            display: table;
            width: 100%;
            table-layout: fixed;
            margin-bottom: 45px;
            .page-wrapper{
                background-color: #FFFFFF;
            }
        }
        .aside {
            &:before {
                top: 50px;
            }
        }
    }
    .app-footer {
        transition: margin-left .28s ease-out;
        background-color: #edf1f2;
        border-top: 1px solid #dee5e7;
        margin-left: 240px;
        padding: 15px;
        text-align: right;
        color: #58666e;
        font-size: 14px;
        position: absolute;
        z-index: 1000;
        bottom: 0;
        right: 0;
        left: 0;
    }
    .hideSideBar {
        .app-left {
            .app-menu {
                overflow: visible;
                width: 64px;
                .menu-list {
                    overflow-y: visible;
                }
                .el-menu--collapse {
                    width: 64px;
                }
            }
            .app-header {
                width: 64px;
                padding-left: 0;
                text-align: center;
            }
        }
        .app-right {
             margin-left: 64px;
             .app-header {
                left: 64px;
             }
        }
        .app-footer {
            margin-left: 64px;
        }
        .el-submenu__title {
            padding:0px !important;
            text-align: center;
            span {
                display: none!important;
            }
        }
    }
</style>
