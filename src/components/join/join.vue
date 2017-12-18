<template>
  <div class="contain">
    <!--头部 start-->
    <div class="head" v-bind:style="{ backgroundImage: 'url(' + image + ')' }">
      <div class="text">
        <div class="txt_right" style="display: none;"><span v-text="title"></span>天</div>
        <div class="txt_left">
          <div class="txt_1" v-text="subtitle">智新会21天早起计划</div>
          <div class="txt_2"><span v-text="nowtime"></span>开始</div>
        </div>
      </div>
    </div>
    <!--头部 end-->
    <!--富文本编辑内容 start-->
    <div class="center" v-html="contant"></div>
    <!--TODO 差一个如果后台没有编辑数据的情况-->
    <!--富文本编辑内容 end-->
    <!--尾部 start-->
    <div class="bottom">
      <div class="bot_title">-点此制定我的早起打卡活动-</div>
      <div class="bot_tip">Powered by</div>
      <div class="bot_btn" @click="join">我要参加</div>
    </div>
    <!--尾部 end-->
  </div>
</template>

<script>
  import weui from 'weui.js'
  import Loading from '@/base/loading/loading'
  import {
    getProjectData,
    joinProject
  } from '@/api/init'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        userInfo: {},
        discList: [],
        contant: '',
        title: '21',
        subtitle: '',
        nowtime: '2017-11-07',
        image: require('./run.jpg')
      }
    },
    methods: {
      init() {
        var vm = this;
        getProjectData().then(res => {
          console.log(res)
          if (res) {
            if (res.contant) {
              vm.contant = res.contant;
            }
            if (res.title) {
              vm.title = res.title;
            }
            if (res.subtitle) {
              vm.subtitle = res.subtitle;
            }
            if (res.nowtime) {
              vm.nowtime = res.nowtime;
            }
            if (res.image) {
              vm.image = res.host + res.image;
            }
          }
        })
      },
      join() {
        var vm = this;
        joinProject().then(res => {
          console.log(res)
          if (res.err_code === 0) {
            if (res.userInfo) {
              localStorage.setItem("userInfo", JSON.stringify(res.userInfo))
            }
            weui.toast('参加成功!', {
              duration: 1500,
              className: 'custom-classname',
              callback: function() {
                vm.$router.replace('/recommend')
              }
            });
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
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  html
  body
    background : $color-bg
  .contain
    .head
      width: 100%
      height: 170px
      background-image: url(./run.jpg)
      background-repeat: no-repeat
      background-size: cover
      position : relative
      .text
        width : 250px
        height : 30px
        position: absolute
        left : 15px
        bottom : 20px
        .txt_right
          color #ffffff
          float left
          width 60px
          text-align left 
          border-right 2px solid #ffffff
          font-size 15px
          span
            font-size : 30px
        .txt_left
          color #ffffff
          text-align left 
          font-size 15px
          width 140px
          float left 
          margin-left 15px
          .txt_1
            margin-bottom 2px
          .txt_2
            margin-top 2px
    .center
      padding: 15px
      text-align auto
      text-align -webkit-auto
    .bottom
      position : fixed
      bottom : 0px
      width : 100%
      background : #fff
      border-top: 7px solid $color-bg
      .bot_title
        font-size : 15px
        color : $color-main
        margin-bottom : 22px
        margin-top : 25px
      .bot_tip
        color : $color-text-d
        margin-bottom : 7px
        font-size : 15px
      .bot_btn
        border-radius: 10px
        background :  $color-btn
        margin : 15px
        color : #ffffff
        font-size : 15px
        height : 36px
        line-height : 36px
</style>
