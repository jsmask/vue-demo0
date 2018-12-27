<template>
        <el-menu class="left-nav"
            @close="handleClose"
            background-color="rgb(27, 35, 71)"
            text-color="#fff"
            active-text-color="#409eff">         
                <template v-for="item in items">
                    <el-submenu :index="item.path" :key="item.path" v-if="item.children">                      
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title" class="left-nav-title">{{item.name}}</span>
                        </template>
                        <template v-for="child in item.children">
                            <router-link :to="'/'+child.path" :key="child.path">
                                <el-menu-item :index="child.path">
                                    <i :class="child.icon"></i>
                                    <span slot="title" class="left-nav-title">{{child.name}}</span>
                                </el-menu-item>
                             </router-link>           
                        </template>
                     </el-submenu>

                     <router-link :to="'/'+item.path" :key="item.path" v-else>
                        <el-menu-item :index="item.path">
                            <i :class="item.icon"></i>
                             <span slot="title" class="left-nav-title">{{item.name}}</span>
                        </el-menu-item>
                    </router-link>
                </template>

        </el-menu>   
</template>

<script>
    export default {
        name:"left-nav",
        data(){
            return {
                items:[{
                    icon:"el-icon-setting",
                    name:"首页",
                    path:"home"
                },{
                    icon:"el-icon-setting",
                    name:"资金管理",
                    path:"fund",
                    children:[{
                        icon:"",
                        name:"资金流水",
                        path:"fundlist"
                    }]
                },{
                    icon:"el-icon-setting",
                    name:"信息管理",
                    path:"info",
                    children:[{
                        icon:"",
                        name:"个人信息",
                        path:"infoshow"
                    }]
                }]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

.left-nav{
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    z-index: 9;
    width: 200px;
    border-top: solid 1px rgb(61, 70, 107);
    border-right: solid 1px rgb(27, 35, 71);
}

</style>
<style>
.el-menu-item,
.el-submenu__title{
    background: rgb(27, 35, 71) !important;
}
    .el-menu-item:hover,
    .el-submenu__title:hover{
    background: rgb(61, 70, 107) !important;
}

</style>