<template>
    <div class="register-main">
        <div class="register-box">
            <h5 class="register-title">口袋管理系统</h5>
            <el-form :model="registerForm" :rules="rules" ref="registerForm" status-icon class="registerForm-content"  label-width="80px">
                <el-form-item label="昵称" prop="name">
                    <el-input type="text" v-model="registerForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱"  prop="email">
                    <el-input type="text" v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码"  prop="pass">
                    <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择身份" prop="identity">
                    <el-select placeholder="请选择" value="" style="width:100%;" v-model="registerForm.identity">
                        <el-option label="职员" value="employee"></el-option>
                        <el-option label="管理员" value="manager"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" style="width:100%;" @click="submitForm('registerForm')">立即注册</el-button>
                </el-form-item>
            </el-form>
            <div class="tips-box">
                <p>已有账号？ <router-link to="/login">去登录</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"register",
        components: {
            
        },
        data(){       
            let validatePass=(rule, value, callback)=>{
                if (value === '') {
                     callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerForm:{
                    name:"",
                    email:"",
                    pass:"",
                    checkPass:"",
                    identity:""
                  },
                  rules: {
                    name: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },                        
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'change' },
                        { type: "email", message: '邮箱格式不正确', trigger: 'change' },                        
                    ],
                    pass:[
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min: 6, max:20, message: '至少为6个字符,最多不超过20个字符', trigger: 'change' }
                    ],
                    checkPass:[
                        { validator: validatePass, trigger: 'change' }
                    ],
                    identity:[
                        {required:true,message:"请选择身份", trigger:"change"}
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
                        .post("api/users/register",{
                            name:this.registerForm.name,
                            email:this.registerForm.email,
                            password:this.registerForm.pass,
                            identity:this.registerForm.identity
                         })
                        .then(result=>{
                            const res=result.data;
                            if(res.status==1){                               
                                this.$message({
                                    message:res.text,
                                    type:"success"
                                });
                                this.$router.push("/login");
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
            }            
        }
    }
</script>

<style scoped>
.register-main{
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg") no-repeat;
    background-size:cover;
}
.register-box{
    width: 400px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -250px;
    border-radius: 5px;
    background: rgba(255,255,255,.8);
    box-sizing: border-box;
    padding: 30px;
}
.register-title{
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