<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">

                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import {ref, reactive} from '@vue/composition-api';
export default {
    name:'layoutMain',
    setup(props, {root}){}
}
</script>
<style lang="css" scoped>
#main-wrap{
    height: 100vh;
    /* position: fixed;
    left: 250px;
    top: 75px;
    right: 0;
    bottom: 0;
    border:30px solid #f7f7f7;
    border-bottom: none;
    -webkit-box-sizing: border; */
}
.main-content{
    width: 100%;
    height: 100%;
    padding-top: 115px; 
    padding-left: 270px;
    padding-right: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.open .main-content{
    padding-left: 270px +30;
}
.open .main-content{
    padding-left: 30px +30;
}
.content{
    width: 100%;
    height: 100%;
    padding: 30px 30px 0px 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
}
</style>