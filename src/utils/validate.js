/**
 * 过滤特殊字符
 */
export function stripscript(s) { 
    var pattern= new RegExp(/[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？]/g)
    var rs = "";
    for(var i = 0; i < s.length; i++){
        rs = rs + s.substr(i,1).replace(pattern, '');
    }
    return rs;
} 
/**
 * 验证邮箱
 */
export function validateEmail(value){
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    return !reg.test(value) ? true : false
}
/**
 * 验证密码 6至20位的字母数字
 */
export function validatePass(value){
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z\d]{6,16}$/;
    return !reg.test(value) ? true : false
}
/**
 * 验证验证码
 */
export function validateVcode(value){
    let reg = /^[a-z0-9]{6}$/
    return !reg.test(value) ? true : false
}