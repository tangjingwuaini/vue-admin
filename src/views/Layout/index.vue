<template>
    <!-- :class="[menuStatus ? 'close' : 'open']" 因为样式不行  所有不用了 -->
    <div id="layout">  
        <LayoutHeader/>
        <LayoutMain/>
        <LayoutNav/>
    </div>
</template>
<script>
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'
import { computed } from '@vue/composition-api'
export default {
    name:'layout',
    components:{LayoutHeader, LayoutMain, LayoutNav},
    setup(props, {root}){
        const menuStatus = computed(() => root.$store.state.app.isCollapse)
        return{
            menuStatus
        }
    }
}
</script>
<style lang="css" scoped>

</style>