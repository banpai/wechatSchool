import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = () => import('@/components/recommend/recommend')
const Loading = () => import('@/components/loading/loading')
const Join = () => import('@/components/join/join')
const Error = () => import('@/components/error/error')
const Turntable = () => import('@/components/turntable/turntable')

export default new Router({
  routes: [
    {path: '/',redirect: '/turntable'},
    {path: '/loading',component: Loading}, 
    {path: '/turntable',component: Turntable},
    {path: '/recommend',component: Recommend},
    {path: '/join',component: Join},
    {path: '/error',component: Error}
  ]
})
