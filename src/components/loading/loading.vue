<template>
  <div class="contain">
    <div id="loading">
      <div id="loading-center">
        <div id="loading-center-absolute">
          <div class="object" id="object_four"></div>
          <div class="object" id="object_three"></div>
          <div class="object" id="object_two"></div>
          <div class="object" id="object_one"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import weui from 'weui.js'
  import Loading from '@/base/loading/loading'
  import {
    isHasOpenid
  } from '@/api/init'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        userInfo: {},
        discList: []
      }
    },
    methods: {
      init() {
        isHasOpenid().then(res => {
          console.log(res)
          if (res.error_code === 60001) {
            window.location.href = res.msg
          } else if (res.error_code === 400088) {
            if (res.openid) {
              localStorage.setItem('openid', res.openid)
            }
            if (res.flag === 1) {
              this.$router.replace('/recommend')
            } else {
              this.$router.replace('/join')
            }
          }
        })
      }
    },
    mounted() {
      // 初始化
      this.init()
      // weui.alert('alert')
    },
    components: {
      Loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #loading {
    background-color: #008ce6;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    margin-top: 0px;
    top: 0px;
  }
  #loading-center {
    width: 100%;
    height: 100%;
    position: relative;
  }
  #loading-center-absolute {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 200px;
    width: 200px;
    margin-top: -100px;
    margin-left: -100px;
    -ms-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
  .object {
    -moz-border-radius: 50% 50% 50% 50%;
    -webkit-border-radius: 50% 50% 50% 50%;
    border-radius: 50% 50% 50% 50%;
    position: absolute;
    border-top: 5px solid #FFF;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #FFF;
    border-right: 5px solid transparent;
    -webkit-animation: animate 2s infinite;
    animation: animate 2s infinite;
  }
  #object_one {
    left: 75px;
    top: 75px;
    width: 50px;
    height: 50px;
  }
  #object_two {
    left: 65px;
    top: 65px;
    width: 70px;
    height: 70px;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  #object_three {
    left: 55px;
    top: 55px;
    width: 90px;
    height: 90px;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  #object_four {
    left: 45px;
    top: 45px;
    width: 110px;
    height: 110px;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  @-webkit-keyframes animate {
    50% {
      -ms-transform: rotate(360deg) scale(0.8);
      -webkit-transform: rotate(360deg) scale(0.8);
      transform: rotate(360deg) scale(0.8);
    }
  }
  @keyframes animate {
    50% {
      -ms-transform: rotate(360deg) scale(0.8);
      -webkit-transform: rotate(360deg) scale(0.8);
      transform: rotate(360deg) scale(0.8);
    }
  }
</style>
