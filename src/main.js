import Vue from 'vue';
import App from './App';
import router from './router';
// import axios from 'axios';
import store from './store/store'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/newIconfont/iconfont.css'
import '../static/css/#EC414D/index.css';


import "babel-polyfill";
//全局调用Vue原型方法
import _prototype from './components/common/commonJS/_prototypeJS'
Vue.use(_prototype);
//全局调用自定义vue指令
import instruction from './components/common/commonJS/instruction'
Vue.use(instruction);
//过滤器统一处理加载
import filters from './components/common/commonJS/filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});
Vue.use(ElementUI, { size: 'small' });
import { getStorage } from "./components/common/commonJS/localStorage";
import { Decrypt } from "./components/common/commonJS/secert";


// Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    let role = getStorage('userInfo');
    if (role) {
        try {
            let RoleAuthorization = JSON.parse(Decrypt(role));
            console.log("用户存在：" + JSON.stringify(RoleAuthorization));
            if (RoleAuthorization.userType !== "") {
                if (to.meta.permission) {
                    if (RoleAuthorization.userType === "2") {
                        next()
                    } else {
                        if (to.path === '/403') {
                            next()
                        } else {
                            next('/403')
                        }
                    }
                } else {
                    next()
                }
            }
        } catch (e) {
            console.log("用户不存在:" + e);
            alert('用户不存在000');
            if (to.path === '/login') {
                next()
            } else {
                next('/login')
            }
        }
    } else {
        console.log(to.path);
        if (to.path !== '/login' && to.path !== '/tenants' && to.path !== '/forgetpassword') {
            next('/login');
        } else {
            if (to.path === '/login' || to.path === '/tenants' || to.path === '/forgetpassword')
                next()
        }
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
