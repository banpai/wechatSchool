<template>
  <div class="contain" v-show="visible" v-bind:style="'top:' + logintop + 'px;'">
    <div class="card">
      <!--标题 start-->
      <div class="title">恭喜您！</div>
      <div class="txt">获得二等奖牛股二</div>
      <!--标题 end-->
      <!--输入框 start-->
      <div class="c_input">
        <div class="weui-flex">
          <div class="txt c_left">姓名:</div>
          <div class="weui-flex__item inputitem">
            <input class="weui-input" type="text" placeholder="">
          </div>
        </div>
        <div class="weui-flex we-tel">
          <div class="txt c_left">电话:</div>
          <div class="weui-flex__item inputitem">
            <input class="weui-input" type="text" placeholder="">
          </div>
        </div>
      </div>
      <!--输入框 end-->

      <!--提交按钮 start-->
      <div class="bottom-btn">提交</div>
      <!--提交按钮 end-->

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        number: ''
      }
    },
    props: {
      visible: Boolean,
      logintop: Number
    },
    methods: {
      // 点击隐藏弹出层
      tap() {
        console.log('ddd')
        this.$emit('update:visible', false)
      },
      // 点击分享
      share() {
        mui.toast('开发中……！', {
          duration: 'short',
          type: 'div'
        })
      },
      // 更新到父组件
      updateValue: function() {
        // 通过 input 事件带出数值
        this.$emit('input', this.nickname)
        this.tap()
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable';
.contain
  position absolute
  top 190px
  width 100%
  .card
    margin-left 18px
    margin-right 18px
    height cp(675)
    background #fdc9c8
    border-radius 50px
    overflow hidden
    .title
      text-align center
      color red
      font-size 36px
      line-height 36px
      margin-top cp(54)
    .txt
      text-align center
      color #7a3008
      font-size 24px
      line-height 24px
      margin-top cp(42)
    .c_input
      padding-left cp(46)
      padding-right cp(46)
      margin-top cp(72)
      .c_left
        margin-top 0
        line-height cp(68)
      .inputitem
        padding-left cp(16)
        .weui-input
          background #fff
          border-radius 50px
          height cp(68)
      .we-tel
        margin-top cp(58)
  .bottom-btn
    font-size 20px
    margin cp(60) auto
    width cp(234)
    height cp(68)
    line-height cp(68)
    border-radius 50px
    background #7a3207
    color #fff
</style>