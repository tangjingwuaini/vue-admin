<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li :class="{'current':item.current}" @click="toggleMneu(item)" v-for="item in menuTab" :key="item.id">{{item.txt}}</li>
            </ul>
            <!-- 表单 start -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm"  class="login-from" size="medium ">
                <el-form-item  prop="username" class="item-from">
                    <label for="username">邮箱</label>
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item  prop="password">
                    <label for="password">密码</label>
                    <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item  prop="passwords" v-show="model === 'register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>
                
                <el-form-item  prop="code">
                    <label>验证码</label>
                        <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{ codeButtonStatus.text }}</el-button>
                        </el-col>
                        </el-row>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block"  :disabled="loginButtonStatus">{{model === 'login' ? "登录" : "注册"}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import sha1 from 'js-sha1';
import {Message} from 'element-ui';
import {GetSms, Register, Login} from "@/api/login";
import {reactive, ref, isRef, onMounted} from '@vue/composition-api';
import {stripscript, validateEmail, validatePass, validateVcode} from '@/utils/validate.js';
export default {
    name:'login',
    // setup(props, context){
      // console.log(context)
      /** 左边3.0 右边对应2.0
       * attrs: (...) === this.$attrs
        emit: (...)  === this.$emit
        isServer: (...)
        listeners: (...)
        parent: (...)
        refs: (...)
        root: (...) === this
       */
    
    setup(props, {refs, root}){
      // 验证用户名
      let validatename = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
           callback(new Error('用户名格式有误'));
        } else {
            callback();
        }
      };
      //  验证密码
      let validatePassword = (rule, value, callback) => {
      //  过滤后的数据
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (validatePass(value)) {
        callback(new Error('密码为6至20位数字加字母'));
      } else {
        callback();
      }
    };
       //  验证重复密码
       let validatePasswords = (rule, value, callback) => {
        //  如果模块值为login,直接通过
        if(model.value === 'login'){callback();}
        //  过滤后的数据
        ruleForm.passwords = stripscript(value);
        value = ruleForm.password;
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== ruleForm.passwords) {
          callback(new Error('重复密码不正确'));
        } else {
          callback();
        }
      };
      //   验证验证码
      let validateCode = (rule, value, callback) => {
      //  过滤后的数据
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (value === '') {
          return callback(new Error('请输入验证码'));
      }else if(validateVcode(value)){
          return callback(new Error('验证码格式有误'));
      }else{
          callback();
      }
      };
      /**
       * 声明数据
       */
      // 这里面放置data数据.生命周期.自定义的函数
      const menuTab = reactive([
          {txt:'登录', current: true, type:'login'},
          {txt:'注册', current:false, type:'register'}
      ])
      // 模块值
      const model = ref('login')
      // 登录按钮禁用状态
      const loginButtonStatus = ref(true);
      // 验证码按钮状态
      const codeButtonStatus = reactive(
        {
          status:false,
          text:'获取验证码'
        }
      )
      // 倒计时
      const timer = ref(null);
      // 表单绑定数据
      const ruleForm = reactive({
        username: '',
        password: '',
        passwords:'',
        code:''
      })
      // 表单的验证
      const rules = reactive({
        username: [
          { validator: validatename, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      })

      /**
      * 1.不建议在一个方法里面数写多个不同的事件(尽可能只数自己本身的事,不要做其他人的事情) 
      * 2.尽量把相同的事情封装一个方法里面,通过调用函数进行执行
      */
     
      /**
      * 声明函数
      */
      // 切换模块
      const toggleMneu = (data => {
          menuTab.forEach(elem =>{
              elem.current = false
          });
          // 高光
          data.current = true
          // 修改模块设置
          model.value = data.type;
          resetFrowData()
          clearCountDoun()
      })
      // 清除表单的数据
      const resetFrowData = (() => {
          // 重置表单
          // this.$refs[formName].resetFields();  //2.0
          refs.loginForm.resetFields(); // 3.0
      })
     // 更新按钮状态
     const updataButtonStatus = ((params) => {
        codeButtonStatus.startus = params.status;
        codeButtonStatus.text = params.text
     })
     /**
     * 获取验证码
     */
      const getSms = (()=>{
        // 进行提示
        if(ruleForm.username == ''){
          root.$message.error('邮箱不能为空');
          return false
        }
        if(validateEmail(ruleForm.username)){
           root.$message.error('邮箱格式有误,请重新输入');
          return false
        }
        // 获取验证码
        let requesData = {
          //  ...........
          username:ruleForm.username, 
          module:model.value
        }
        // 修改获取验证码按钮状态
        updataButtonStatus({
          status:true,
          text:'发送中'
        })
      // 延迟多长时间
        GetSms(requesData).then(response =>{
          let data = response.data
          console.log(response);
          root.$message({
            message:data.message,
            type:'success',
            // ........
            code:data.code
          })
          // 启用登录或注册按钮
          loginButtonStatus.value = false
          // 调定时器,倒计时
          countDom(60)
        }).catch(error => {
          console.log(error);
        })
      })
    /**
     * 提交表单
     */
    const submitForm = (formName => {
      refs[formName].validate((valid) => {
      // 表单验证通过
      if (valid) {
        // 三元运算
        model.value === 'login' ? login() : register()
      } else {
        console.log('error submit!!');
        return false;
      }
    })
  })
    /**
    * 登录
    */
   const login = (() => {
      let repuestData = {
          username:ruleForm.username,
          password:sha1(ruleForm.password),
          code:ruleForm.code
        }
      root.$store.dispatch('app/login', repuestData).then(response => {
       console.log('登录成功')
       console.log(response)
       // 页面跳转
       root.$router.push({
         name:'Console'
       })
     }).catch(error =>{});
   })
    /**
    * 注册
    */
   const register = (() => {
       let requestData = {
          username:ruleForm.username,
          password:sha1(ruleForm.password),
          code:ruleForm.code,
          module:'register'
        }
        // 注册接口
        Register(requestData).then(response =>{
          let data = response.data
          root.$message({
            message:data,
            type:'success'
            // code:data.code
            // ...........
          })
          // 模拟注册成功
          toggleMneu(menuTab[0])
          clearCountDoun()
        }).catch((error =>{
          // 失败时的代码
        }))
   })
    /**
     * 倒计时
     */
      const countDom = ((number) => {
        // 60和0 不见了,故意留的
        // setTimeout:clearTimeout(变量) 只执行一次
        // setInterval:clearInterval(变量) 不断的执行,需要条件才会停止
        // 判断定时器是否存在,存在则清除
        if(timer.value){ clearInterval(timer.value); }
        let time = number
        timer.value = setInterval(() => {
          time--;
          if(time === 0){
            clearInterval(timer.value)
            updataButtonStatus({
              status:false,
              text:'再次获取'
            })
          }else{
            codeButtonStatus.text = `倒计时${time}秒` // es5 '倒计时' + time + '秒'
          }
        },1000)
      })
      /**
       * 清除倒计时
       */
      const clearCountDoun = (() => {
        // 还原验证码按钮默认状态
        updataButtonStatus({
            status:false,
            text:'获取验证码'
          })
        // 清除倒计时
        clearInterval(timer.value)
      })

     /**
      * 生命周期
      */
     // 挂载完成后
     onMounted(() => {
       
     })  

     return{
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      ruleForm,
      rules,
      toggleMneu,
      submitForm,
      getSms
     }
    },
    // 创建完成时
    created(){}, 
    // 定义函数
    methods:{
      
    }
}
</script>
<style lang="css" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;
}
.login-wrap{
    width: 330px;
    margin: auto;
}
.menu-tab{
    text-align: center;
}
.menu-tab li{
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
}
.current{
    background-color: rgba(0, 0, 0, .1);
}
.login-from label{
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
}
.item-from{
    margin-bottom: 13px;
}
.block{
    display: block;
    width: 100%;
}
.login-btn{
    margin-top: 19px;
}
</style>