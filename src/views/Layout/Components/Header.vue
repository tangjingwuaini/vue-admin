<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState">图标<svg-icon iconClass="menu" className="menu" /></div>
         <div class="pull-right header-icon">
            <div class="user-info pull-left">
                <img src="../../../assets/02.jpg" alt="">
                {{username}}
                管理员
            </div>
            <div class="header-icon  pull-left" @click="exit">
                <svg-icon iconClass="exit" className="exit" />退出
            </div>
         </div>
    </div>
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
    name:'layoutHeader',
    setup(props, {root}){
        const username = computed(() => root.$store.state.app.username);
        const navMenuState = () => {
            root.$store.commit('app/SET_COLLAPSE')
        }
        // 退出
        const exit = () =>{
            root.$store.dispatch('app/exit').then(() => {
                root.$router.push({
                    name:'Login'
                })
            })
        }
        return{
            navMenuState,
            username,
            exit
        }
    }
}
</script>
<style lang="css" scoped>
#header-wrap{
    position: fixed;
    top:0;
    right: 0;
    left: 250px;
    height: 75px;
    background-color: #fff;
    -webkit-box-shadow:0 3px 16px 0 rgba(0, 0, 0, .1);
    line-height: 75px;
    cursor:pointer;
}
.open #header-wrap{
    left: 250px;
}
.close #header-wrap{
    left: 64px;
}
.hreder-icon{
    padding: 0 32px;
}
.hreder-icon svg{
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
}

.pull-left{
    float:left;
    /* left: 10px; */
}

.pull-right{
    float: right;
}

.user-info{
    height:100%;
    padding:0 32px;
    border-right: 1px solid #ededed;

}

.user-info .hreder-icon{
    padding: 0 20px;
}

.user-info img{
    width: 40px;
    height: 40px;
    position: relative;
    right: 10px;
    top:10px;
}
</style>