<template>
  <div class="contain" v-if="visible">
    <div :class="visibleFade ? 'weui-mask bp-fade-in' : 'weui-mask bp-fade-out' " @click="tap"></div>
    <!--弹出层 start-->
    <div :class="visibleFade ? 'filtrate bp-slide-up' : 'filtrate bp-slide-down'">
      <Scroll class="scrollFiltrate">
        <div class="card">
          <div class="classify">
            <div class="subheading">按名师</div>
            <div class="weui-grids grids">
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(0)" :class="classifyIndex === 0 ? 'labelBtn pitch' : 'labelBtn' ">GridGridGridGridGridGridGrid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(1)" :class="classifyIndex === 1 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(2)" :class="classifyIndex === 2 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(3)" :class="classifyIndex === 3 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(4)" :class="classifyIndex === 4 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(5)" :class="classifyIndex === 5 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(6)" :class="classifyIndex === 6 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(7)" :class="classifyIndex === 7 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(8)" :class="classifyIndex === 8 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
            </div>
          </div>
          <div class="classify">
            <div class="subheading">按分类</div>
            <div class="weui-grids grids">
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(9)" :class="classifyIndex === 9 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(10)" :class="classifyIndex === 10 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(11)" :class="classifyIndex === 11 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(12)" :class="classifyIndex === 12 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
            </div>
          </div>
          <div class="classify">
            <div class="subheading">按价格</div>
            <div class="weui-grids grids">
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(13)" :class="classifyIndex === 13 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(14)" :class="classifyIndex === 14 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(15)" :class="classifyIndex === 15 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(16)" :class="classifyIndex === 16 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(17)" :class="classifyIndex === 17 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
              <a href="javascript:;" class="weui-grid">
                <div @click="switchType(18)" :class="classifyIndex === 18 ? 'labelBtn pitch' : 'labelBtn' ">Grid</div>
              </a>
            </div>
          </div>
        </div>
      </Scroll>
      <!--底部按钮 start-->
      <div class="bottomButton aboveLine weui-flex">
        <div class="weui-flex__item reset" @click="reset">重置</div>
        <div class="weui-flex__item sure" @click="sure">确定</div>
      </div>
      <!--底部按钮 end-->
    </div>
    <!--弹出层 end-->
  </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll'
  export default {
    components: {
      Scroll
    },
    data() {
      return {
        name: '',
        number: '',
        // 动画切换
        visibleFade: true,
        // 切换分类
        classifyIndex: -1,
        stateIndex: -1
      }
    },
    props: {
      visible: Boolean,
      logintop: Number
    },
    methods: {
      // 初始化
      init(){
        console.log('初始化')
        this.classifyIndex = this.stateIndex
      },
      // 点击隐藏弹出层
      tap() {
        this.visibleFade = false
        setTimeout(() => {
          this.$emit('update:visible', false)
          this.visibleFade = true
        }, 300)
      },
      // 点击分享
      share() {
        mui.toast('开发中……！', {
          duration: 'short',
          type: 'div'
        })
      },
      //切换种类
      switchType(i) {
        this.classifyIndex = i
      },
      // 重置
      reset() {
        this.classifyIndex = -1
        this.stateIndex = -1
        this.tap()
      },
      // 确定
      sure() {
        this.stateIndex = this.classifyIndex
        this.$emit('sure', this.stateIndex)
        this.tap()
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '~@/common/stylus/animate'
.weui-grids:after, .weui-grids:before
  height 0
  border 0
.weui-grid:after, .weui-grid:before
  border 0
  height 0
.contain
  position relative
  .filtrate
    position absolute
    background #fff
    bottom 0
    width 100%
    z-index 20001
    padding-top cp(36)
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    .scrollFiltrate
      max-height cp(950)
      overflow-y auto
    .classify
      .subheading
        text-align left
        font-size cp(24)
        line-height cp(24)
        color #535353
        margin-left cp(30)
      .grids
        margin-left cp(15)
        margin-right cp(15)
        margin-bottom cp(36)
        .weui-grid
          width 25%
          padding-left cp(15)
          padding-right cp(15)
          padding-bottom 0
          padding-top cp(20)
          .labelBtn
            height cp(58)
            line-height cp(58)
            text-align center
            font-size cp(22)
            color #000
            border 1px solid $hui
            border-radius cp(30)
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: break-word;
            word-break: break-all;
          .pitch
            border 1px solid #2c6fff
            color #2c6fff
            background rgba(44, 111,255, .1)
    .bottomButton
      height cp(88)
      line-height cp(88)
      font-size cp(24)
      .reset
        color #2c6fff
      .sure
        color #fff
        background #2c6fff
</style>