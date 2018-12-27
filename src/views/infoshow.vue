<template>
    <div class="infoshow">
        <el-row type="flex" class="infoshow-main" align="middle">
            <el-col class="infoshow-box-a" :span="8">
                <img :src="user.avatar" alt="">
            </el-col>
            <el-col class="infoshow-box-b" :span="16">
                <p>昵称：{{user.name}}</p>
                <p>邮箱：{{user.email}}</p>
                <p>身份：{{getIndentity(user.identity)}}</p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import com from "../com.js";
    export default {
        name:"infoshow",
         computed: {
            user(){        
                return this.$store.getters.user;
            }
        },
        methods:{
            getIndentity(value){
                return com.getIdentity(value)
            }
        }
    }
</script>

<style scoped>
.infoshow-main{
    height: 100%;
}
.infoshow-box-a{
    background: #f8f8f8;
    text-align: center;
    height: 100%; 
    position: relative;
}
.infoshow-box-a img{
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 100%;
    border:1px solid #999;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top:-50px;
}
.infoshow-box-b{
    box-sizing: border-box;
    padding-left: 30px;
}
.infoshow-box-b>p{
    font-size: 16px;
    line-height: 32px;
}
</style>