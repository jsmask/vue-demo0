<template>
    <div class="login-main">
        <div class="login-box">
            <h5 class="login-title">口袋管理系统</h5>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon class="loginForm-content"  label-width="80px">
                <el-form-item label="邮箱"  prop="email">
                    <el-input type="text" v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码"  prop="pass">
                    <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
                </el-form-item>        
                <el-form-item>
                    <el-button type="primary" style="width:100%;" @click="submitForm('loginForm')">立即登录</el-button>
                </el-form-item>
            </el-form>
            <div class="tips-box">
                <p>还没有账号？ <router-link to="/register">去注册</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
    import jwtdecode from 'jwt-decode';
    export default {
        name:"login",
        components: {
            
        },
        data(){ 
            return {
                loginForm:{
                    email:"",
                    pass:"",
                  },
                  rules: {
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'change' },
                        { type: "email", message: '邮箱格式不正确', trigger: 'change' },                        
                    ],
                    pass:[
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min: 6, max:20, message: '至少为6个字符,最多不超过20个字符', trigger: 'change' }
                    ]
                }
            }
        },
        mounted () {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios
                        .post("api/users/login",{
                            email:this.loginForm.email,
                            password:this.loginForm.pass,
                         })
                        .then(result=>{
                            const res=result.data;
                            if(res.status==1){
                                this.$message({
                                    message:res.text,
                                    type:"success"
                                });
                                const decoded=jwtdecode(res.data.token);
                                this.$store.dispatch('setAuthenticated',!this.isEmpty(decoded))
                                this.$store.dispatch('setUser',decoded)
                                window.localStorage.setItem("kd_token",res.data.token);
                                this.$router.push("/index");
                            }else{
                                this.$message({
                                    message:res.text,
                                    type:"error"
                                 });
                            }                           
                        });
                        return;
                    } else {
                        return false;
                    }
                });
            },
            isEmpty(value){
                return (
                    value === undefined ||
                    value ===null ||
                    (typeof value == "object" && Object.keys(value).length == 0) ||
                    (typeof value == "string" && value.trim().length == 0)
                )
            }           
        }
    }
</script>

<style scoped>
.login-main{
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg") no-repeat;
    background-size:cover;
}
.login-box{
    width: 400px;
    height: 310px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -155px;
    border-radius: 5px;
    background: rgba(255,255,255,.8);
    box-sizing: border-box;
    padding: 30px;
}
.login-title{
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
}
.tips-box{
    text-align: right;
    font-size: 12px;
}
.tips-box a{
    color: #409EFF;
}
</style>