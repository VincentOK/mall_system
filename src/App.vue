<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import { removeStorage } from "./components/common/commonJS/localStorage";
    import {mapState, mapMutations,mapActions} from 'vuex'
    export default {
        data() {
            return {
            }
        },
        created(){
            let userMessage = this.userInfo;
            if (userMessage) {
                // debugger;
                // this.$connectSocket('ws://192.168.0.138:8989/timestoremanage/websocket/123456');
            }
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        mounted(){
            console.log("APP.VUE+测试");
            try {
                this.GET_LOCALUSERINFO();
            }catch (e) {
                alert('用户信息错误');
                removeStorage('token');
                removeStorage('userInfo');
                removeStorage('resourceList');
                this.$router.push('/login');
            }
        },
        methods:{
            ...mapMutations([
                'GET_LOCALUSERINFO'
            ]),
        }
    };
</script>
<style>
@import "../static/css/main.css";
@import "../static/css/color-dark.css"; /*深色主题*/
/* @import "../static/css/theme-green/color-green.css";    */
@import "../static/css/cover_el.css";
.el-scrollbar__wrap {
  overflow-x: hidden;
}
#app{
    font-size: 13px;
}
.content{
  padding: 20px 40px;
}
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
  -webkit-appearance:textfield;
}
input[type="number"]{
  -moz-appearance:textfield;
}
.imgWidth img{
  width: 100%;
}
.product_detail img{
  width: 500px;
  height: 300px;
}
</style>
