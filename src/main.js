import Vue from 'vue';
import App from './App';
import router from './router';
// import axios from 'axios';
import store from './store/store'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/iconfont/iconfont.css'
import '../static/css/#EC414D/index.css';


import "babel-polyfill";
//全局调用Vue原型方法
import _prototype from './components/common/commonJS/_prototypeJS'
Vue.use(_prototype);
//全局调用自定义vue指令
import instruction from './components/common/commonJS/instruction'
Vue.use(instruction);

Vue.use(ElementUI, { size: 'small' });
import { getStorage } from "./components/common/commonJS/localStorage";
import { Decrypt } from "./components/common/commonJS/secert";

// Vue.prototype.$axios = axios;
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    console.log("路由权限:"+getStorage('userInfo'));

    let role = getStorage('userInfo');
    console.log("路由权限："+role);
    // if(role){
    //     try {
    //         let RoleAuthorization = JSON.parse(Decrypt(role));
    //         RoleAuthorization.userType === '1' ? next() : next('/403');
    //         if(to.meta.permission){
    //             // 如果是管理员权限则可进入
    //             RoleAuthorization.userType === '1' ? next() : next('/403');
    //         }else {
    //             next();
    //         }
    //         throw new Error('用户不存在');
    //     }catch (e) {
    //         console.log("用户不存在:"+e)
    //         alert('用户不存在')
    //         if (to.path === '/403') { //这就是跳出循环的关键
    //             console.log('403')
    //             next()
    //         } else {
    //             console.log('400')
    //            next();
    //         }
    //     }
    // }else {
    //     console.log(to.path)
    //     if(to.path !== '/login' && to.path !== '/tenants' && to.path !== '/forgetpassword'){
    //         next('/login');
    //     }else {
    //         if(to.path === '/login' || to.path === '/tenants' || to.path === '/forgetpassword')
    //         next()
    //     }
    // }




    if(!role && to.path !== '/login' && to.path !== '/tenants' && to.path !== '/forgetpassword'){
        console.log("路径："+to.path);
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入
        let RoleAuthorization = JSON.parse(Decrypt(getStorage('userInfo')));
        RoleAuthorization.userType === '1' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            console.log("uuuuu："+role);
            next();
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
