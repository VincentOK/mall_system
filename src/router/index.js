import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const myrouter =[
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自述文件' },
        children:[
            {
                path: '/dashboard',
                component: resolve => require(['../components/commercial/Dashboard.vue'], resolve),
                meta: { title: '系统首页' }
            },
            {
                path: '/onlineManagement',
                component: resolve => require(['../components/commercial/goods_management/OnlineManagement.vue'], resolve),
                meta: { title: '线上商品管理' }
            },
            {
                path: '/addnewgoods',
                component: resolve => require(['../components/commercial/goods_management/AddNewGoods.vue'], resolve),
                meta: { title: '新增商品' }
            },
            {
                path: '/untreatedOrders',
                component: resolve => require(['../components/commercial/order_management/UntreatedOrders.vue'], resolve),
                meta: { title: '待处理订单' }
            },
            {
                path: '/processedOrder',
                component: resolve => require(['../components/commercial/order_management/ProcessedOrder.vue'], resolve),
                meta: { title: '已处理订单' }
            },
            {
                path: '/incomestatistics',
                component: resolve => require(['../components/commercial/assets_management/IncomeStatistics.vue'], resolve),
                meta: { title: '收益统计与结算' }
            },
            {
                path: '/returnsdetailed',
                component: resolve => require(['../components/commercial/assets_management/ReturnsDetailed.vue'], resolve),
                meta: { title: '结算明细' }
            },
            {
                // 富文本编辑器组件
                path: '/editor',
                component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                meta: { title: '富文本编辑器' }
            },
            {
                // markdown组件
                path: '/markdown',
                component: resolve => require(['../components/page/Markdown.vue'], resolve),
                meta: { title: 'markdown编辑器' }
            },
            {
                // 图片上传组件
                path: '/upload',
                component: resolve => require(['../components/page/Upload.vue'], resolve),
                meta: { title: '文件上传' }
            },
            {
                // vue-schart组件
                path: '/charts',
                component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                meta: { title: 'schart图表' }
            },
            {
                // 拖拽列表组件
                path: '/drag',
                component: resolve => require(['../components/page/DragList.vue'], resolve),
                meta: { title: '拖拽列表' }
            },
            {
                // 权限页面
                path: '/permission',
                component: resolve => require(['../components/page/Permission.vue'], resolve),
                meta: { title: '权限测试', permission: true }
            }
        ]
    },
    {
        path: '/login',
        component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
        path: '/tenants',
        component: resolve => require(['../components/commercial/tenants.vue'], resolve),
        meta: { title: '商家入驻', permission: true }
    },
    {
        path: '/forgetpassword',
        component: resolve => require(['../components/commercial/forgetpassword.vue'], resolve),
        meta: { title: '忘记密码', permission: true }
    },
    {
        path: '/404',
        component: resolve => require(['../components/page/404.vue'], resolve)
    },
    {
        path: '/403',
        component: resolve => require(['../components/page/403.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/404'
    }
]
export default new Router({
    routes: myrouter
})
