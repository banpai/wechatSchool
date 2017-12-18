<template>
  <div class="contain">
    <div class="weui-skin_android" id="androidActionsheet" style="opacity: 1;" v-show="visible">
      <div class="weui-mask" v-tap="{methods: tap}"></div>
      <div class="weui-actionsheet">
        <div class="weui-actionsheet__menu">
          <div class="shareTitle">
            实名信息
            <i class="weui-icon-cancel x_cg" v-tap="{methods: tap}"></i>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入真实姓名" v-model="name">
            </div>
          </div>
          <div class="weui-cell input_2">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入身份证号" v-model="number">
            </div>
          </div>
          <div class="btn" v-tap="{methods: updateValue}">修改</div>
          <div class="he"></div>
        </div>
      </div>
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
      visible: Boolean
    },
    methods: {
      // 点击隐藏弹出层
      tap() {
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
.shareTitle
  padding-top _c(44)
  padding-left _c(30)
  font-size $font-size-20
  color #000000
  text-align center
  position relative
  .x_cg
    float right
    position absolute
    right _c(30)
.shareMenu
  width _c(450)
  margin _c(35) auto
  text-align center
  padding-bottom _c(35)
  .shareIcon
    width _c(48)
    height _c(48)
    margin 0 auto
    img
      width 100%
      height 100%
  .shareItem
    font-size $font-size-16
    color #000000
    margin-top _c(15)
.btn
  margin-left _c(30)
  margin-right _c(30)
  margin-top _c(0)
.he
  height _c(30)
.weui-cell:before
  border 0
  height 0
.input_2
  padding-top _c(0)
</style>