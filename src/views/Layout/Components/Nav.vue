<template>
    <div id="nav-wrap">
        <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
        <el-menu default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        :collapse="isCollapse" 
        background-color="transparent" 
        text-color="#fff" 
        active-text-color="#fff"
        router>
       
        <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
            <!-- 一级菜单 -->
            <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className=" item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
            </template>
            <!-- 子级菜单 -->
            <template v-for="subItem in item.children">
                <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path">
                    {{ subItem.meta.name }}
                </el-menu-item>
            </template>
            
        </el-submenu>
        </template>
        </el-menu>
        <svg-icon iconClass="menu" className="menu" />
    </div>
</template>
<script>
import {reactive, ref, isRef, toRefs, onMounted, computed} from '@vue/composition-api';
export default {
    name:'navMenu',
    setup(props, {root}){
        /**
         *  data 数据
         */
        const routers = reactive(root.$router.options.routes);
       /**
        * computed 监听
        */
       const isCollapse = computed(() => root.$store.state.app.isCollapse);

        return {
            isCollapse,
            routers
        }
    }
}
</script>
<style lang="css" scoped>
.logo{
    text-align: center;
}
.logo img{
    margin: 28px auto 25px;
    width: 97px;
}
#nav-wrap{
    position:fixed;
    top:0;
    left: 0;
    width: 250px;
    height: 100vh;
    background-color: #344a5f;
    -webkit-transform: all .3s ease 0s;
    -moz-transition:all .3s ease 0s;
    -o-transform: all .3s ease 0s;
    -ms-transiton:all .3s ease 0s;
    transition: all .3s ease 0s;
}
#nav-wrap svg{
    font-size:20px;
    margin-right: 10px;
}
.open nav-wrap{
   width: 250px;
}
.close nav-wrap{
    width: 50px;
}
</style>