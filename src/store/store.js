import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './action'
import mutations from './mutations'
Vue.use(Vuex);

const state = {
    loginStatus:true,
    loginWord:'登陆',
    word:'a',
    lay:'b',
    user_id:''
};
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

