import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 个人中心页面的路由
export const personalCenter = [
  { path: '/turntable', name: '大转盘', component: resolve => { require(['@/components/turntable/turntable'], resolve); } },
];

export const routers = [
  { path: '/', redirect: '/turntable' },
  ...personalCenter
];

const router = new Router({
  routes: routers
})

export default router