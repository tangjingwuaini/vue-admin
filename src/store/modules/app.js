import { Login } from "@/api/login"
import {setToKen, removeToken, removeUserName, setUserName, getUserName} from "@/utils/app"
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: '',
    username:getUserName() || ''
}

const  getters = {
    isCollapse: state => state.isCollapse
}

const mutations = { // 同步 没有回调处理事情
    SET_COLLAPSE(state){
        console.log('app')
        state.isCollapse = !state.isCollapse;  
        // html5本地存储
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TOKE(state, value){
        state.token = value
    },
    SET_USERNAME(state, value){
        state.username = value
    }
}

const  actions = {  // 可以回调处理事情
    login({commit}, repuestData){
      return new Promise((resolve, reject) => {
          // 接口
          Login(repuestData).then((response) => {
              console.log(response)
              let data = response.data.data
              // 普通的
            //   content.commit('SET_TOKE', data.to_ken);
            //   content.commit('SET_USERNAME', data.username);
              // 解构的
              commit('SET_TOKE', data.token);
              commit('SET_USERNAME', data.username);
              setToKen(data.token);
              setUserName(data.username);
              resolve(response)
          }).catch(error => {
              reject(error)
          })
      })   
    },
    // 退出
    exit({ commit }){
        return new Promise((resolve, reject) => {
            removeToken();
            removeUserName();
            commit('SET_TOKE', '');
            commit('SET_USERNAME', '');
            resolve();
        })
    }
  }



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
