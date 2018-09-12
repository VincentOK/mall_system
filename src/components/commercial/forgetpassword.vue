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
                        <el-form-item label="用户名：" prop="username">
                            <el-input v-model="form.username" placeholder="" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:" prop="phone">
                            <el-input v-model.number="form.phone" type="number" placeholder="" maxlength="20" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                        </el-form-item>

                        <el-form-item label="验证码" class="getcode" prop="loginname">
                            <button  v-show="show" class="redcolor" @click="getCode">发送验证码</button>
                            <button  v-show="!show" class="greycolor" :disabled="true">{{count}}s</button>
                            <el-input v-model="form.loginname"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="loginpassword">
                            <el-input v-model="form.loginpassword"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="againpassword">
                            <el-input v-model="form.againpassword"></el-input>
                        </el-form-item>
                        <el-form-item class="submit-button" style="margin: 0;float: right">
                            <router-link :to="'/login'" class="goback_login">< 返回登陆页&nbsp;</router-link>
                            <el-button type="primary" @click="onSubmit('form')">确认提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "forgrtpassword",
        data(){
            return {
                show: true,
                count: '',
                timer: null,


                form: {
                    username: "",
                    phone: null,
                    loginname:'',
                    loginpassword:'',
                    againpassword:'',
                },
                rules:{
                    username: [
                        {required: true, message: "请联系人姓名", trigger: "blur" }
                    ],
                    phone: [
                        {required: true, message: "请输入手机号码", trigger: "blur"}
                    ],
                    loginname: [
                        {required: true, message: "请输入用户名", trigger: "blur" }
                    ],
                    loginpassword: [
                        {required: true, message: "请输入登陆密码", trigger: "blur" }
                    ],
                    againpassword: [
                        {required: true, message: "请再次输入密码", trigger: "blur" }
                    ],
                }
            };
        },
        methods: {
            getCode(){
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            onSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        console.log(JSON.stringify(this.form));
                        this.$message.success("提交成功！");
                    } else {
                        this.$message.error("提交失败!");
                        return false;
                    }
                });
            },
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
