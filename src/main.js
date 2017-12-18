// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

// import wx from 'script-loader!@/common/js/jweixin-1.2.0.js';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 移动端点击300毫秒延迟
import fastclick from 'fastclick'
fastclick.attach(document.body)
// 全局样式
import 'common/stylus/index.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
