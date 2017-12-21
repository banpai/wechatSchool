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
      <input class="weui-input pass tel" type="text" placeholder="请输入密码">
      <div class="weui-flex huixan">
        <div class="weui-flex__item phone">手机验证登录</div>
        <div>忘记密码</div>
      </div>
    </div>
    <!--登录表单 end-->
    <!--底部按钮 start-->
    <div class="bottom">
      <div class="loginbtn" @click="login">登录</div>
      <div class="zhuce">没有账号，<span class="blue" @click="zhuce">立即注册</span></div>
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
      },
      login() {
        weui.alert('登录')
      },
      skip(e) {
        console.log(e)
        if (e) {
          this.$router.push(e)
        }
      },
      zhuce(){
        // console.log('dddd')
        this.$router.push('/zhuce')
      }
    },
    mounted() {
      document.title = "登录"
      // this.$router.push('/zhuce')
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
  .pass
    margin-top cp(70)
  .huixan
    width cp(500)
    margin cp(24) auto
    font-size cp(24)
    line-height cp(24)
    .phone
      text-align left
      color #3571f4
  .bottom
    margin-top cp(242)
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
