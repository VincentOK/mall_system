import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store/store'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/iconfont/iconfont.css'
import '../static/css/#EC414D/index.css';


import "babel-polyfill";
//全局调用Vue原型方法
import _prototype from './components/common/commonJS/_prototypeJS'
Vue.use(_prototype)
//全局调用自定义vue指令
import instruction from './components/common/commonJS/instruction'
Vue.use(instruction)

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    console.log(from)
    if(!role && to.path !== '/login' && to.path !== '/tenants' && to.path !== '/forgetpassword'){
        console.log("路径："+to.path)
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        next();
        // role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
