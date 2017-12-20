<template>
  <div class="bg" v-bind:style="'height:' + height + 'px;'">
    <!--大转盘 start-->
    <RouletteWheel @callback="tanchu"></RouletteWheel>
    <!--大转盘 end-->
    <!--弹出层 start-->
    <Login :visible.sync="visible"></Login>
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
        height: 1000
      }
    },
    methods: {
      // 动态计算背景高度
      _bgHeight(){
        var img = new Image()
        img.src = require('./images/bg.png')
        this.height = (window.screen.width / img.width) * img.height
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
</style>
