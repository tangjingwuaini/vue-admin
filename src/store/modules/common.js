import { GetCategory } from "@/api/news";
const state = {
    qiniuUrl:"http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/"
}
const  getters = {
    qiniuUrl: state => state.qiniuUrl
}
const actions = {  // 可以回调处理事情
    geInfotCategor(content, repuestData){
        return new Promise((resolve, reject) => {
            // 接口
            GetCategory({}).then((response) => {
                resolve(response.data.data.data)
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
    actions
  };