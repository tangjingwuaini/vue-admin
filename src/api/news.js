import service from "@/utils/request";
/**
 * 列表
 */
export function GetList(data){
    return service.request({
        method: "post",
        url: "news/getList/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}

/**
 * 新增
 */
export function AddInfo(data){
    return service.request({
        method: "post",
        url: "/news/add/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}

/**
 * 编辑
 */
export function EdidInfo(data){
    return service.request({
        method: "post",
        url: "/news/editInfo/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}

/**
 * 删除
 */
export function DeleteInfo(data){
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}

 /**
 * 一级分类添加
 */
export function AddFristCategory(data){
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}

 /**
 * 子级分类添加
 */
export function AddChildrenCategory(data){
    return service.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}
/**
 * 获取分类
 */
export function GetCategory(data){
    return service.request({
        method: "post",
        url: "/news/getCategory/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}

/**
 * 获取全部分类(包含子级)
 */
export function GetCategoryAll(data){
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}

/**
 * 删除分类
 */
export function DeleteCategory(data){
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}

/**
 * 修改分类
 */
export function EditCategory(data){
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
        // data:data, 左边的data是变量名(key)后台接收的.右边的Data是接收的参数,如果两者都是同名的情况下,可以写成单一即可(ES6写法)
    })
}