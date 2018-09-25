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
                        <el-form-item label="手机号码:"  prop="userPhone">
                            <el-input v-model.number="form.userPhone"  type="number" placeholder="请输入手机号码" maxlength="11" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                        </el-form-item>

                        <el-form-item label="验证码" class="getcode" prop="captcha">
                            <span  v-show="show" class="redcolor" @click="getCode(form.userPhone)">发送验证码</span>
                            <span  v-show="!show" class="greycolor" :disabled="true">{{count}}s</span>
                            <el-input v-model="form.captcha" placeholder="请输入短信验证码"></el-input>
                        </el-form-item>



                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="form.password" placeholder="请输入新密码" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="form.checkPass" placeholder="请再次输入新密码" auto-complete="off"></el-input>
                        </el-form-item>


                        <!--<el-form-item label="新密码" prop="newPassWord" >-->
                            <!--<el-input v-model="form.newPassWord"  auto-complete="off"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="确认密码" prop="againpassword">-->
                            <!--<el-input v-model="form.againpassword"  auto-complete="off"></el-input>-->
                        <!--</el-form-item>-->

                        <el-form-item class="submit-button" style="margin: 0;float: right">
                            <router-link :to="'/login'" class="goback_login">&lt; 返回登陆页&nbsp;</router-link>
                            <el-button type="primary" @click="onSubmit('form')">确认提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { forgotPasswordSubmit,forgetPhoneCode } from "../common/request/request";
    import { isvalidPhone } from "../common/commonJS/commonjs";
    export default {
        name: "forgrtpassword",
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let validPhone=(rule, value,callback)=>{
                if (!value){
                    callback(new Error('请输入手机号码'))
                }else  if (!isvalidPhone(value)){
                    callback(new Error('请输入正确的11位手机号码'))
                }else {
                    callback()
                }
            };
            return {
                show: true,
                count: '',
                timer: null,


                form: {
                    userPhone: null,
                    captcha:'',
                    password:'',
                    checkPass:'',
                },
                rules:{
                    userPhone: [
                        { required: true, trigger: 'blur', validator: validPhone }//这里需要用到全局变量
                    ],
                    captcha: [
                        {required: true, message: "请输入验证码", trigger: "blur" }
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            /**
             * 获取短信验证码
             */
            getCode(val){
                forgetPhoneCode(val).then(res =>{
                    console.log(res);
                    if(res.code === "0"){
                        this.$message('发送验证码成功');
                        this.getTimeer();
                    }else {
                        this.$message.error(res.msg)
                    }
                }).catch(err =>{
                    console.log(err)
                })
            },
            /**
             * 倒计时
             * @param formName
             */
            /**
             * 获取验证码倒计时
             */
            getTimeer(){
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
                        forgotPasswordSubmit(this.form).then(res =>{
                            console.log(res);
                            if(res.code ==="0"){
                                this.$message.success("提交成功！");
                                this.$router.push('/login')
                            }else {
                                this.$message.error(res.msg);
                            }
                        }).catch(err =>{
                            console.log(err)
                        })
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
