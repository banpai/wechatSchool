<template>
  <div id="box" class="box">
    <!--大转盘 start-->
    <RouletteWheel ref="wheel"></RouletteWheel>
    <!--大转盘 end-->

    <!--弹出层 start-->
    <Login :visible.sync="visible"></Login>
    <!--弹出层 end-->

  </div>
</template>

<script>
  import weui from 'weui.js'
  import Login from '@/base/dialog/login.vue'
  import RouletteWheel from '@/base/game/RouletteWheel.vue'
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
        visible: true
      }
    },
    methods: {
      init(){
        let wheelData = {
           awards: [
            // 转盘内的奖品个数以及内容
            '奖品一', '奖品二', '奖品三', '奖品四', '奖品五', '奖品六'
          ],
          index: 6,
          callback: function(r){
            
          }
        }
        this.$refs.wheel.init(wheelData)
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
</style>
