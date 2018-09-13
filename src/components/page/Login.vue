<template>
    <div class="login-wrap">
        <div class="login_first_title">
            <label class="wrd_title">时间商城</label>&nbsp;后台管理系统
        </div>
        <div class="login_bg">
             <div class="login_icon"></div>
            <div class="login_form">
                <div class="ms-login">
                    <p class="login_title">时间商城后台管理系统</p>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                        <el-form-item prop="username">
                            <i class="shopping-icon-user login_iconfont"></i>
                            <el-input  class="login_input" v-model="ruleForm.username" placeholder="用户名">

                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" >
                            <i class="shopping-icon-lock login_iconfont"></i>
                            <el-input type="password"  class="login_input" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                        </el-form-item>

                        <el-form-item prop="checkword" class="getcode">
                            <i class="shopping-icon-safetycertificate login_iconfont"></i>
                            <el-input   class="login_input" placeholder="验证码" v-model="ruleForm.checkword" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                            <img :src="imgCode" @click="getNewCode" class="redcolor" alt="">
                        </el-form-item>

                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        </div>
                        <p style="font-size:12px;line-height:30px;color:#999;">
                            <router-link :to="'/tenants'" style="float: left;color: #5394ec">商家入驻申请</router-link>
                            <router-link :to="'/forgetpassword'" style="float: right;color: #5394ec">忘记密码？</router-link>
                        </p>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCode,userLogin} from '../common/request/request'
    import {mapState, mapMutations,mapActions} from 'vuex'
    export default {
        data: function(){
            return {
                imgCode:getCode(),
                ruleForm: {
                    username: '18614060970',
                    password: '123456',
                    checkword:'',
                },
                val:'',
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    checkword: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
        },
        computed:{
            ...mapState([
            ]),

        },
        mounted(){
            // console.log('8888');
            // this.getNewCode();
            // testa(1).then(res =>{
            //     console.log(res)
            // }).catch(err =>{
            //     console.log(err)
            // })
        },
        methods: {
            ...mapMutations([
                'GET_RESOURCE','GET_USERINFO','GET_USERTOKEN'
            ]),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(JSON.stringify(this.ruleForm));
                        // let msg = {"token":"3d8a6855-e661-458a-906f-1e602a27a910",
                        //     "sysResources":[
                        //         {icon:'shopping-icon-home-fill',index:'dashboard',title:'概览'},
                        //         {
                        //             icon: 'shopping-icon-shopping',
                        //             index: '1',
                        //             title: '商品管理',
                        //             subs: [
                        //                 {
                        //                     index: 'onlineManagement',
                        //                     title: '线上商品管理'
                        //                 },
                        //                 {
                        //                     index: 'addnewgoods',
                        //                     title: '新增商品'
                        //                 }
                        //             ]
                        //         },
                        //         {
                        //             icon: 'shopping-icon-detail-fill',
                        //             index: '4',
                        //             title: '订单管理',
                        //             subs: [
                        //                 {
                        //                     index: 'untreatedOrders',
                        //                     title: '待处理订单'
                        //                 },
                        //                 {
                        //                     index: 'processedOrder',
                        //                     title: '已处理订单'
                        //                 }
                        //             ]
                        //         },
                        //         {
                        //             icon: 'shopping-icon-Dollar',
                        //             index: '3',
                        //             title: '资产管理',
                        //             subs: [
                        //                 {
                        //                     index: 'Incomestatistics',
                        //                     title: '收益统计与结算'
                        //                 },
                        //                 {
                        //                     index: 'returnsdetailed',
                        //                     title: '结算明细'
                        //                 }
                        //             ]
                        //         }],
                        //     // "sysResources":[
                        //     //     {icon:'shopping-icon-home-fill',index:'admin',title:'管理员权限'},
                        //     // ],
                        //     "user":{"id":1,"uid":"123456","userName":"zhanglong","password":"ad434c4a1cd5c0b7e5338c03a819281c","passwordSalt":"HelloTime","userType":"2","commercialType":null,"commercialName":null,"commercialIntroduction":null,"linkPhone":null,"linkName":null,"province":null,"city":null,"bankNo":null,"cardNo":null,"cardFrontImgPath":null,"cardBackImgPath":null,"cardHandheldImgPath":null,"creditCode":null,"licenseImgPath":null,"otherImgPath":null,"auditUser":null,"auditTime":null,"auditOpinion":null,"createTime":null,"updateTime":null,"availability":"1","status":"0"}}
                        // this.GET_USERTOKEN(msg.token);
                        // this.GET_USERINFO(msg.user);
                        // this.GET_RESOURCE(msg.sysResources);
                        // if(msg.user.userType === "2"){
                        //     this.$router.push('/');
                        // }else {
                        //     this.$router.push('/admin');
                        // }
                        userLogin(this.ruleForm.username,this.ruleForm.password,this.ruleForm.checkword).then(res =>{
                            console.log(JSON.stringify(res));
                            if(res.code === '0'){
                                this.GET_USERTOKEN(res.data.token);
                                this.GET_USERINFO(res.data.user);
                                this.GET_RESOURCE(res.data.sysResources);
                                if(res.data.user.userType === '1'){
                                    this.$router.push('/');
                                }else if(res.data.user.userType === '2'){
                                    this.$router.push('/admin');
                                }
                            }else{
                                alert(res.msg);
                                this.getNewCode();
                            }

                        }).catch(err =>{
                            console.log(err);
                            alert('请求失败')
                            // loading.close();
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**
             * 获取验证码
             */
            getNewCode(){
                this.imgCode = this.imgCode+'?'+this.generateMixed(6);
            },
            /**
             * 获取随机数
             */
            generateMixed(){
                let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                let res = "";
                for(let i = 0; i < chars.length; i++) {
                    let id = Math.ceil(Math.random() * 35);
                    res += chars[id];
                }
                return res;
            }
        }
    }
</script>

<style scoped>
    .getcode{
        position: relative;
    }
    .redcolor{
        position: absolute;
        right: 0;
        color: white;
        height: 42px;
        border: none;
        width: 100px;
        line-height: 42px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
    }



.login_iconfont{
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
}
    .wrd_title{
        font-size: 30px;
        color: #EC414D;
        font-weight: 600;
    }
    .login_title{
        margin: 20px 0;
    }
    .login_bg{
        display: flex;
        position: absolute;
        width:80%;
        height:80%;
        top: 10%;
        left: 10%;
        background-image: url("/static/img/login_bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .login_first_title{
        position: absolute;
        top: 4%;
        width: 80%;
        margin: auto;
        margin-left: 20%;
    }
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-color: white;
    }
    .login_icon{
        flex: 1;
        position: absolute;
        top:10%;
        left: 15%;
        height: 500px;
        width: 500px;
        background-image: url("/static/img/login_icon.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;

    }
    .login_form{
        width: 50%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        flex: 1;
        position: absolute;
        right:10%;
        top:40%;
        width:300px;
        height:350px;
        margin:-150px 0 0 -190px;
        padding:0px 40px 40px 40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
        padding-top: 20px;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
