import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login/index.vue";
import Console from "../views/Layout/index.vue"

// 引入布局组件
import Layout from '@/views/Layout/index.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"login",
    hidden:true,
    meta:{
      name:"主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    meta:{
      name:"登录"
    },
    component: Login
  },
  {
    path: "/console",
    name: "Console",
    redirect:"index",
    meta:{
      name:"控制台",
      icon:'user'
    },
    component: Layout,
    children:[
      {
        path: "/index",
        name: "Index",
        meta:{
          name:"首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta:{
      name:"信息管理",
      icon:'info'

    },
    component: Console,
    children:[
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta:{
          name:"信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta:{
          name:"信息分类"
        },
        component: () => import("../views/Info/category.vue")
      },
      {
        path: "/infoDetailed",
        name: "InfoDetailed",
        hidden:true,
        meta:{
          name:"信息详情"
        },
        component: () => import("../views/Info/detailed.vue")
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta:{
      name:"用户管理",
      icon:'console'
    },
    component: Layout,
    children:[
      {
        path: "/userIdex",
        name: "UserIdex",
        meta:{
          name:"用户列表"
        },
        component: () => import("../views/User/index.vue")
      },
    ]
  },
  
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
