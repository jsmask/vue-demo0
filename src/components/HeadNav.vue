<template>
    <header class="head-nav">
        <el-row :gutter="24" type="flex">
            <el-col :span="7" class="head-nav-logo">
                <img src="../assets/logo.png" alt="logo" @click="toHome">
                <span>口袋管理系统</span>
            </el-col>
            <el-col :span="17" class="head-nav-info">
                <el-dropdown trigger="click" @command="selectInfoCommand">
                    <span class="el-dropdown-link">
                            <img class="head-nav-avatar" :src="user.avatar" alt="">
                            <span class="head-nav-nickname">{{user.name}}</span>
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="infoshow">个人信息</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>             
            </el-col>
        </el-row>
    </header>
</template>

<script>
    export default {
        name:"head-nav",
        components: {
            
        },
        computed: {
            user(){
                return this.$store.getters.user
            }
        },
        methods: {
            selectInfoCommand(command) {
                switch (command) {
                    case "infoshow":
                        this.infoshow();
                        break;
                     case "logout":
                        this.logout();
                        break;
                    default:
                        break;
                }               
            },
            infoshow(){
                this.$router.push("/infoshow");
            },
            logout(){
                this.$store.dispatch("clearLogin");
                window.localStorage.removeItem("kd_token");
                this.$router.push("/login");
            },
            toHome(){
                this.$router.push("/home");
            }
        }
    }
</script>

<style scoped>
.head-nav{
    width: 100%;
    height: 60px;  
    background: rgb(27, 35, 71);
    position: relative;
    box-sizing: border-box;
}
.head-nav-logo,
.head-nav-info{
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
}
.head-nav-logo img{
    height:45px;
    vertical-align: middle;
    margin-left: 20px;
    margin-right: 10px;
    cursor: pointer;
}
.head-nav-logo span{
    font-size: 20px;
    color: #fff;
    vertical-align: middle;
}
.head-nav-info{
    text-align: right;
}
.head-nav-avatar{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    object-fit: cover;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 10px;
}
.head-nav-nickname{
    font-size: 14px;
    display: inline-block;
    height: 30px;
     vertical-align: middle;
     margin-right: 3px;
     line-height: 30px;
    color: #fff;
    text-align: left;
}
.el-dropdown-link{
    margin-right: 20px;
    cursor: pointer;
    color: #fff;
}
</style>