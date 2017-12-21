<template>
  <div class="bg" v-bind:style="'height:' + height + 'px;'">
    <!--大转盘 start-->
    <RouletteWheel  v-bind:style="'top:' + top + 'px;'" @callback="tanchu" @cbjs="_bgHeight" class="wheel" :wheelLen="wheelLen"></RouletteWheel>
    <!--大转盘 end-->
    <!--弹出层 start-->
    <Login :visible.sync="visible" :logintop="logintop"></Login>
    <!--弹出层 end-->
  </div>
</template>

<script>
  import weui from 'weui.js'
  import Login from '@/base/dialog/login.vue'
  import RouletteWheel from '@/base/game/Wheel.vue'
  import {
    getJssdk
  } from '@/api/init'
  export default {
    name: 'HelloWorld',
    components: {
      RouletteWheel,
      Login
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        visible: false,
        height: 1000,
        wheelLen: 300,
        top: 355,
        logintop: 190
      }
    },
    methods: {
      // 动态计算背景高度
      _bgHeight(){
        var img = new Image()
        img.src = require('./images/bg.png')
        this.height = (window.screen.width / img.width) * img.height
        this.wheelLen = (window.screen.width / img.width) * 526
        this.top = (window.screen.width / img.width) * 655
        this.logintop = (window.screen.width / img.width) * 370
      },
      init() {
        this._bgHeight()
      },
      tanchu() {
        this.visible = true
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
.bg
  height 1000px
  background-image url(./images/bg.png)
  background-repeat no-repeat
  background-size 100% 100%
  position relative
  .wheel
    // border 1px solid #000
    position absolute
    top 355px
    left 50% 
</style>
