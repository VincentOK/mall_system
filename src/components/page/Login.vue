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
                            <img src="/static/img/e.jpg" class="redcolor" alt="">
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
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    checkword:''
                },
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
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('ms_username',this.ruleForm.username);
                        this.$router.push('/');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .getcode{
        position: relative;
    }
    .redcolor{
        background-color: #ec414d;
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
