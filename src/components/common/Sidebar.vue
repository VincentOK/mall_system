<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" active-background-color="#545c64" background-color="#FFFEFE"
            text-color="black" active-text-color="#EC414D" unique-opened router>
            <template v-for="item in resourceList">
                <template v-if="item.childResources">
                    <el-submenu :index="(item.id).toString()" :key="item.id">
                        <template slot="title">
                            <i :class="item.icon" style="padding: 10px"></i><span slot="title">{{ item.name }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.childResources" :key="i" :index="subItem.url">
                            {{ subItem.name }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else >
                    <el-menu-item :index="item.url" :key="item.id">
                        <i :class="item.icon"  style="padding: 10px"></i><span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import {mapState, mapMutations,mapActions} from 'vuex'
    export default {
        data() {
            return {
                collapse: false,
                // items: [
                //     {
                //         icon: 'shopping-icon-home-fill',
                //         index: 'dashboard',
                //         title: '概览'
                //     },
                //     {
                //         icon: 'shopping-icon-shopping',
                //         index: '1',
                //         title: '商品管理',
                //         subs: [
                //             {
                //                 index: 'onlineManagement',
                //                 title: '线上商品管理'
                //             },
                //             {
                //                 index: 'addnewgoods',
                //                 title: '新增商品'
                //             }
                //         ]
                //     },
                //     // {
                //     //     icon: 'el-icon-tickets',
                //     //     index: 'table',
                //     //     title: '基础表格'
                //     // },
                //     // {
                //     //     icon: 'el-icon-message',
                //     //     index: 'tabs',
                //     //     title: 'tab选项卡'
                //     // },
                //
                //     {
                //         icon: 'shopping-icon-detail-fill',
                //         index: '4',
                //         title: '订单管理',
                //         subs: [
                //             {
                //                 index: 'untreatedOrders',
                //                 title: '待处理订单'
                //             },
                //             {
                //                 index: 'processedOrder',
                //                 title: '已处理订单'
                //             }
                //         ]
                //     },
                //     {
                //         icon: 'shopping-icon-Dollar',
                //         index: '3',
                //         title: '资产管理',
                //         subs: [
                //             {
                //                 index: 'Incomestatistics',
                //                 title: '收益统计与结算'
                //             },
                //             {
                //                 index: 'returnsdetailed',
                //                 title: '结算明细'
                //             }
                //         ]
                //     },
                //     // {
                //     //     icon: 'el-icon-warning',
                //     //     index: 'permission',
                //     //     title: '权限测试'
                //     // },
                //     // {
                //     //     icon: 'el-icon-error',
                //     //     index: '404',
                //     //     title: '404页面'
                //     // },
                //     // {
                //     //     index: 'editor',
                //     //     title: '富文本编辑器'
                //     // },
                //     // {
                //     //     index: 'markdown',
                //     //     title: 'markdown编辑器'
                //     // },
                //     // {
                //     //     index: 'upload',
                //     //     title: '文件上传'
                //     // }
                // ]
            }
        },
        computed:{
            ...mapState([
                'resourceList'
            ]),
            onRoutes(){
                return this.$route.path.replace('/','');('/','');
            }
        },
        mounted(){
            // console.log(JSON.stringify(this.resourceList));
        },
        methods:{
            getRousource(){

            },
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            //获取用户所拥有权限菜单
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }

</style>
