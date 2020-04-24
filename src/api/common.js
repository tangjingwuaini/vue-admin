import { GetCategory, GetCategoryAll } from "@/api/news"
import { reactive } from "@vue/composition-api"
export function common(){
    const categoryItem = reactive({
        item:[]
    });
    /**
     * 获取分类
     */
    const getInfoCategory = () => {
        GetCategory({}).then(response => {
            categoryItem.item = response.data.data.data
        }).catch(error => {

        })
    }

    /**
     * 获取分类
     */
    const getInfoCategoryAll = () => {
        GetCategoryAll({}).then(response => {
            console.log(response)
            categoryItem.item = response.data.data
        }).catch(error => {

        })
    }

    return {
        getInfoCategory,
        getInfoCategoryAll,
        categoryItem
    }
}

/**
 * 获取七牛云token
 */
export function QiniuToKen(data){
    return service.request({
        method: 'post',
        url: "/uploadImgToken/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}
