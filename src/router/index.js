import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let routes = [
  // 首页页面
  {
      path: '/',
      redirect: '/course'
  }
]

export const personalCenter = [
  { path: '/turntable', name: '大转盘', component: resolve => { require(['@/components/turntable/turntable'], resolve); } },
  { path: '/denglu', name: '登录', component: resolve => { require(['@/components/denglu/denglu'], resolve); } },
  { path: '/zhuce', name: '注册', component: resolve => { require(['@/components/denglu/zhuce'], resolve); } },
  { path: '/loading', name: '加载', component: resolve => { require(['@/components/loading/loading'], resolve); } },
  { path: '/course', name: '课程', component: resolve => { require(['@/components/course/course'], resolve); } }
];

export const routers = [
  ...routes,
  ...personalCenter
];

const router = new Router({
  routes: routers
})

export default router