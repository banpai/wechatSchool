<template>
  <div id="box" class="box">
    <div class="outer KinerLottery KinerLotteryContent t_img">
      <img src="./images/dial.png">
    </div>
    <!-- 大专盘分为三种状态：活动未开始（no-start）、活动进行中(start)、活动结束(completed),可通过切换class进行切换状态，js会根据这3个class进行匹配状态 -->
    <div class="inner KinerLotteryBtn start"></div>
  </div>
</template>

<script>
  import weui from 'weui.js'
  import Login from '@/base/dialog/login.vue'
  const $ = require('$')
  const win = require('win')
  import {
    getJssdk
  } from '@/api/init'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      
    },
    mounted() {
      /**
       * 根据转盘旋转角度判断获得什么奖品
       * @param deg
       * @returns {*}
       */
      var whichAward = function(deg) {
        if ((deg > 330 && deg <= 360) || (deg > 0 && deg <= 30)) { //10M流量
          return "三网通流量 10M";
        } else if ((deg > 30 && deg <= 90)) { //IPhone 7
          return "iPh";
        } else if (deg > 90 && deg <= 150) { //30M流量
          return "三网通流量 30M";
        } else if (deg > 150 && deg <= 210) { //5元话费
          return "话费5元";
        } else if (deg > 210 && deg <= 270) { //IPad mini 4
          return "ipad mini4";
        } else if (deg > 270 && deg <= 330) { //20元话费
          return "话费20元";
        }
      }
      var KinerLottery = new win.KinerLottery({
        rotateNum: 8, //转盘转动圈数
        body: "#box", //大转盘整体的选择符或zepto对象
        direction: 0, //0为顺时针转动,1为逆时针转动
        disabledHandler: function(key) {
          switch (key) {
            case "noStart":
              alert("活动尚未开始");
              break;
            case "completed":
              alert("活动已结束");
              break;
          }
        }, //禁止抽奖时回调
        clickCallback: function() {
          //此处访问接口获取奖品
          function random() {
            return Math.floor(Math.random() * 360);
          }
          this.goKinerLottery(random());
        }, //点击抽奖按钮,再次回调中实现访问后台获取抽奖结果,拿到抽奖结果后显示抽奖画面
        KinerLotteryHandler: function(deg) {
          alert("恭喜您获得:" + whichAward(deg));
        } //抽奖结束回调
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
.box
  width 300px
  height 300px
</style>
