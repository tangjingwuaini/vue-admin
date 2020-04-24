import Vue from "vue";
import Vuex from "vuex";
import {Login} from "@/api/login";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
    },
    getters:{
        isCollapse: state => state.isCollapse
    },
    mutations: { // 同步 没有回调处理事情
        SET_COLLAPSE(state){
            state.isCollapse = !state.isCollapse    
            // html5本地存储
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        }
    },
    actions: {  // 可以回调处理事情
      login(content, repuestData){
        return new Promise((resolve, reject) => {
            // 接口
            Login(repuestData).then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })   
      }
    }
});