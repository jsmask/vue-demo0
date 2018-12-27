<template>
    <div class="home">
        <div class="mk">
            <h3>欢迎来到口袋世界</h3>
            <p>在这里,我们可以尽可能的发挥想象哟~</p>
        </div>
    </div>
</template>

<script>
    export default {
        name:"home"
    }
</script>

<style scoped>
 .home{
     position: absolute;
     background:url(../assets/map.png) 0 0 no-repeat,url(../assets/sky.png) 0 0 repeat-x;
     background-size: cover, 100% 50%;
     animation: map 30s -1s linear infinite alternate;
 }

 @keyframes map{
     0%,1%{
         background-position-x: 0%
     }
     99%,100%{
         background-position-x: 100%
     }   
 }
 .mk{
     width: 100%;
     height: 100%;
     text-align: center;
     color: rgb(247,189,1);
     background: rgba(0,0,0,.3);
     box-sizing: border-box;
     padding-top: 80px;
 }
 .mk h3{
     font-size: 34px;
     margin-bottom: 20px;
 }
 .mk p{
    font-size: 20px;
 }
</style>