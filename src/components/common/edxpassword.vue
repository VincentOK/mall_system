<!--商家入驻-->
<template>
    <div class="tenants">
        <p class="tenants_title">商城后台系统</p>
        <div class="a_link">
            <a href="#">&nbsp;&nbsp;&nbsp;时间商城</a>/
            <a href="#">密码找回</a>
        </div>
        <div class="form_tenants">
            <div class="container" style="border: none">
                <div class="form-box" style="margin: auto;width: 400px;margin-top: 200px;margin-bottom: 350px">
                    <el-form ref="form" :rules="rules" :model="form" label-width="150px">
                        <el-form-item label="原密码" prop="oldpassword">
                            <el-input v-model="form.oldpassword"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="loginpassword">
                            <el-input v-model="form.loginpassword"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="againpassword">
                            <el-input v-model="form.againpassword"></el-input>
                        </el-form-item>
                        <el-form-item class="submit-button" style="margin: 0;float: right">
                            <router-link :to="'/dashboard'" class="goback_login">< 返回首页&nbsp;</router-link>
                            <el-button type="primary" @click="onSubmit('form')">确认修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "edxpassword",
        data(){
            return {
                form: {
                    oldpassword:'',
                    loginpassword:'',
                    againpassword:'',
                },
                rules:{
                    oldpassword: [
                        {required: true, message: "请输入原密码", trigger: "blur" }
                    ],
                    loginpassword: [
                        {required: true, message: "请输入新密码", trigger: "blur" }
                    ],
                    againpassword: [
                        {required: true, message: "请再次输入新密码", trigger: "blur" }
                    ],
                }
            };
        },
        methods: {
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
        height: 30px;
        border: none;
        width: 80px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
    }
    .greycolor{
        background-color: darkgray;
        position: absolute;
        right: 0;
        color: white;
        height: 30px;
        border: none;
        width: 80px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
    }

    .form_tenants{
        background-color: white;
    }
    .a_link{
        background-color: white;
        padding: 10px 10px 10px 0;
        color: #EC414D;
        font-size: 16px;
        margin: 10px 0px 20px 0px;
    }
    .a_link a:first-child{
        border-left: 2px solid #EC414D;
    }
    .a_link a{
        color: #EC414D;

    }
    .tenants{
        height: 100%;
        width: 100%;
        background-color: #eeeeee;
    }
    .tenants_title{
        background-color: #EC414D;
        margin: 0;
        padding: 10px 10px 10px 0;
        text-indent: 15px;
        color: white;
        font-size: 20px;
    }

</style>
