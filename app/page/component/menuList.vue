<script lang="jsx">
    /**
     * @file navmenu.vue
     * @author zengqingzhuang(zengqingzhuang@baidu.com)
     * @description 菜单组件
     * @since 2017/10/25
     */
    import api from 'api';
    export default {
        props: {
            // 是否收起menu
            isCollapse: {
                type: Boolean,
                default: false
            },
            // 默认激活地址-不传默认激活当前路由地址
            defaultActive: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                prefix: '/',
                menuData: []
            };
        },
        methods: {
            async actionHandler(uri) {
                if (!this.isExistRoute(uri)) {
                    window.location.href = uri;
                    return;
                }
                let fullPath = window.location.href;
                let [userInfo, userPerm] = await Promise.all([
                    api.getUserInfo(),
                    api.checkUserPerm({url: uri})
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
                this.$router.push({path: uri});
            },
            // 遍历前端路由判断当前点击的链接是否存在，不存在则跳转。to do后期crm全部迁移后此处逻辑删除
            isExistRoute(uri) {
                let isExist = false;
                let routes = this.$router.options.routes;
                for (let i = 0; i < routes.length; i++) {
                    let route = routes[i];
                    for (let j = 0; j < route.children.length; j++) {
                        if (this.prefix + '/' + route.children[j].path === uri) {
                            isExist = true;
                            break;
                        }
                    }
                    if (isExist) {
                        break;
                    }
                }
                return isExist;
            }
        },
        async created() {
            this.prefix = this.$router.options.routes[0].path;
            let result = await api.getMenuList();
            this.menuData = result.data.data;
        },
        render(h) {
            let menuList = [];
            let vm = this;
            if (this.menuData.length <= 0) { return };
            this.menuData.forEach(item=> {
                menuList.push(createMenu(item));
            });
            function createMenu(item) {
                let menuChildren = [];
                if (item.children && item.children.length > 0) {
                    menuChildren.push(
                        <el-submenu index={item.name}>
                            <template slot="title">
                                <i class={item.style}></i><span slot="title">{item.name}</span>
                            </template>
                            {createChildren(item.children)}
                        </el-submenu>
                    )
                } else {
                    menuChildren.push(<el-menu-item onClick={vm.actionHandler.bind(this, item.uri)} index={item.uri}><i class={item.style}></i>{item.name}</el-menu-item>);
                }
                return menuChildren;
            }
            function createChildren(children) {
                let menuChildren = [];
                children.forEach(menu => {
                    if (menu.children && menu.children.length > 0) { // 父节点
                        menuChildren.push(createMenu(menu))
                    } else { // 子节点
                        menuChildren.push(<el-menu-item onClick={vm.actionHandler.bind(this, menu.uri)} index={menu.uri}><i class={menu.style}></i>{menu.name}</el-menu-item>);
                    }
                });
                return menuChildren;
            }
            return  <div><el-menu default-active={this.defaultActive || this.$route.path} collapse={this.isCollapse}>
                        {menuList}
                    </el-menu></div>
        }
    };
</script>

<style rel="stylesheet/less" lang="less">
    .el-menu {
        .fa {
            margin: 0 8px 0 0;
        }
    }
</style>