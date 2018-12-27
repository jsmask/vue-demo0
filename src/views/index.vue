<template>
    <div>
        <HeadNav></HeadNav>
        <LeftNav class="left-nav" :class="{'active':leftshow}"></LeftNav>
        <span class="left-show-btn" @click.stop="leftshow=!leftshow" :class="{'active':!leftshow}">
            <i class="iconfont" v-if="leftshow">&#xe645;</i>
            <i class="iconfont" v-else>&#xe646;</i>
        </span>
        <router-view class="content" :class="{'active':!leftshow}"></router-view>
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav'
import LeftNav from '../components/LeftNav'
    export default {
        name:"index",
        components: {
            HeadNav,
            LeftNav
        },
        data(){
            return {
                leftshow:true
            }
        }
    }
</script>

<style scoped>
.left-show-btn{
    width: 18px;
    height: 150px;
    background:rgb(27, 35, 71);
    border-radius: 0 18px 18px 0;
    color: #fff;
    position: absolute;
    top: 50%;
    margin-top: -100px;
    left: 200px;
    cursor: pointer;
    z-index: 9;
    transition: .2s all;
    line-height: 150px;
    text-align: center;
    
}
.left-show-btn i{
font-size: 12px;
color:rgb(156, 163, 226);
}
.content{
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 200px;
    transition: .2s all;
}
.content.active{
    left: 0px;
}
.left-nav{
    left: -200px;
    transition: .2s all;
}
.left-nav.active,
.left-show-btn.active{
    left: 0px;
}
</style>

