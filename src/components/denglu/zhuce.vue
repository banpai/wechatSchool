<template>
  <div class="login">
    <!--图 start-->
    <div class="bg">
      <img src="./images/bg.png" />
    </div>
    <!--图 end-->
    <!--登录表单 start-->
    <div class="">
      <input class="weui-input tel" type="text" placeholder="请输入手机号">
      <div class="weui-flex pass tel yzm">
        <input class="weui-flex__item weui-input" type="text" placeholder="请输入验证码">
        <div class="send">发送</div>
      </div>
      <input class="weui-input pass tel" type="text" placeholder="请输入6位以上密码">
      <input class="weui-input pass tel" type="text" placeholder="邀请码（选填）">
    </div>
    <!--登录表单 end-->
    <!--底部按钮 start-->
    <div class="bottom">
      <div class="loginbtn">注册</div>
      <div class="zhuce">已有账号，<span class="blue" @click="denglu">去登陆</span></div>
    </div>
    <!--底部按钮 end-->
  </div>
</template>

<script>
  import weui from 'weui.js'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      init() {
        console.log('开始注册')
        // getJssdk().then((res) => {
        //   console.log(res.msg)
        //   // 如果状态码是60001，说明没有jssdk权限，需要做跳转
        //   if (res.error_code === 60001) {
        //     // top.location = res.msg
        //   }
        // })
      },
      denglu() {
        this.$router.replace('/denglu')
      }
    },
    mounted() {
      document.title = "注册"
      // 初始化
      // this.init()
      // weui.alert('alert')
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
.login
  .bg
    width cp(250)
    height cp(240)
    margin cp(82) auto
    margin-bottom cp(70)
    img
      width 100%
      height 100%
  .tel
    width cp(470)
    height cp(50)
    line-height cp(50)
    border 1px solid $hui
    padding-left cp(15)
    padding-right cp(15)
  .yzm
    margin 0 auto
    .send
      font-size 15px
  .pass
    margin-top cp(53)
  .huixan
    width cp(500)
    margin cp(24) auto
    font-size cp(24)
    line-height cp(24)
    .phone
      text-align left
      color #3571f4
  .bottom
    margin-top cp(72)
    .loginbtn
      height cp(70)
      width cp(450)
      line-height cp(70)
      background #3571f4
      border-radius cp(8)
      margin 0 auto
      color #fff
    .zhuce
      font-size cp(24)
      line-height cp(24)
      margin-top cp(32)
      .blue
        color #3571f4

</style>
