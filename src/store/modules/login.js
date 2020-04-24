const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}

const  getters = {
  isCollapse: state => state.isCollapse
}

const mutations = { // 同步 没有回调处理事情
  SET_COLLAPSE(state){
      console.log('login')
      state.isCollapse = !state.isCollapse;  
      // html5本地存储
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  }
}

const  actions = {  // 可以回调处理事情
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



export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
