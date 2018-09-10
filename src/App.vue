<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import {mapState, mapMutations,mapActions} from 'vuex'
    export default {
        data() {
            return {
            }
        },
        computed:{

        },
        mounted(){
            console.log("APP.VUE")
            this.GET_LOCALUSERINFO();
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
</style>
