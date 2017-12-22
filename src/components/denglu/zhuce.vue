<template>
  <div class="login">
    <!--图 start-->
    <div class="bg">
      <img src="./images/bg.png" />
    </div>
    <!--图 end-->
    <!--登录表单 start-->
    <div class="">
      <input v-model="tel" class="weui-input tel" type="text" placeholder="请输入手机号">
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
  function runAsync1() {
    var p = new Promise(function(resolve, reject) {
      //做一些异步操作
      setTimeout(function() {
        console.log('异步任务1执行完成');
        resolve('随便什么数据1');
      }, 1000);
    });
    return p;
  }
  function runAsync2() {
    var p = new Promise(function(resolve, reject) {
      //做一些异步操作
      setTimeout(function() {
        console.log('异步任务2执行完成');
        resolve('随便什么数据2');
      }, 2000);
    });
    return p;
  }
  function runAsync3() {
    var p = new Promise(function(resolve, reject) {
      //做一些异步操作
      setTimeout(function() {
        console.log('异步任务3执行完成');
        resolve('随便什么数据3');
      }, 2000);
    });
    return p;
  }
  function getNumber() {
    var p = new Promise(function(resolve, reject) {
      //做一些异步操作
      setTimeout(function() {
        var num = Math.ceil(Math.random() * 10); //生成1-10的随机数
        num = 8
        if (num <= 5) {
          resolve(num);
        } else {
          reject('数字太大了');
        }
      }, 2000);
    });
    return p;
  }
  import weui from 'weui.js'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        tel: 13151297760
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
      // runAsync1()
      //   .then(function(data) {
      //     console.log(data);
      //     return runAsync2();
      //   })
      //   .then(function(data) {
      //     console.log(data);
      //     return '直接返回数据'; //这里直接返回数据
      //   })
      //   .then(function(data) {
      //     console.log(data);
      //   });
      // getNumber()
      //   .then(function(data) {
      //     console.log('resolved');
      //     console.log(data);
      //   })
      //   .catch(function(reason) {
      //     console.log('rejected');
      //     console.log(reason);
      //   });
      // getNumber()
      //   .then(function(data) {
      //     console.log('resolved');
      //     console.log(data);
      //     console.log(somedata); //此处的somedata未定义
      //   })
      //   .catch(function(reason) {
      //     console.log('rejected');
      //     console.log(reason);
      //   });
      Promise
        .all([runAsync1(), runAsync2(), runAsync3()])
        .then(function(results) {
          console.log(results);
        });
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
