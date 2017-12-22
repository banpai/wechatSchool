<template>
  <div class="login">
    <!--课程选项 start-->
    <div class="options weui-flex">
      <div @click="cut(0)" :class="option === 0 ? 'classical pitchOn' : 'classical'">精品课程</div>
      <div @click="cut(1)" :class="option === 1 ? 'individual pitchOn' : 'individual'">私教课</div>
    </div>
    <!--课程选项 end-->
    <!--菜单 start-->
    <div class="bottomLine aboveLine weui-flex menu">
      <div class="weui-flex__item">
        <div class="item">
          <span class="pullDown">购买人数</span>
        </div>
      </div>
      <div class="weui-flex__item">
        <div class="item">
          <span class="pullDown">课程好评</span>
        </div>
      </div>
      <div class="weui-flex__item" @click="filtrate">
        <div class="item">
          <span class="filtrate">筛选</span>
        </div>
      </div>
    </div>
    <!--菜单 end-->
    <!--课程列表 start-->
    <Scroll class="roll"  ref="scroll" :eventFlag.sync="eventFlag" :style="'height:' + scrollHeight + 'px;'"  :pullup="pulldown" @scrollToEnd="scrollToEnd">
      <div class="curriculums">
        <div class="bottomLine aboveLine table">
          <div class="photograph">
            <img src="./images/course.png" />
          </div>
          <div class="details weui-flex">
            <div class="weui-flex__item">
              <div class="designation">小白学炒股</div>
              <div class="particulars weui-flex">
                <div class="ico">
                  <img src="./images/number.png" />
                </div>
                <div class="number">已有<span>2000</span>人学习</div>
                <div class="like ico">
                  <img src="./images/like.png" />
                </div>
                <div class="number">3453</div>
              </div>
            </div>
            <div class="label">免费</div>
          </div>
        </div>
        <div class="bottomLine aboveLine table">
          <div class="photograph">
            <img src="./images/course.png" />
          </div>
          <div class="details weui-flex">
            <div class="weui-flex__item">
              <div class="designation">小白学炒股</div>
              <div class="particulars weui-flex">
                <div class="ico">
                  <img src="./images/number.png" />
                </div>
                <div class="number">已有<span>2000</span>人学习</div>
                <div class="like ico">
                  <img src="./images/like.png" />
                </div>
                <div class="number">3453</div>
              </div>
            </div>
            <div class="label">免费</div>
          </div>
        </div>
        <div class="bottomLine aboveLine table">
          <div class="photograph">
            <img src="./images/course.png" />
          </div>
          <div class="details weui-flex">
            <div class="weui-flex__item">
              <div class="designation">小白学炒股</div>
              <div class="particulars weui-flex">
                <div class="ico">
                  <img src="./images/number.png" />
                </div>
                <div class="number">已有<span>2000</span>人学习</div>
                <div class="like ico">
                  <img src="./images/like.png" />
                </div>
                <div class="number">3453</div>
              </div>
            </div>
            <div class="label">免费</div>
          </div>
        </div>
        <div class="bottomLine aboveLine table">
          <div class="photograph">
            <img src="./images/course.png" />
          </div>
          <div class="details weui-flex">
            <div class="weui-flex__item">
              <div class="designation">小白学炒股</div>
              <div class="particulars weui-flex">
                <div class="ico">
                  <img src="./images/number.png" />
                </div>
                <div class="number">已有<span>2000</span>人学习</div>
                <div class="like ico">
                  <img src="./images/like.png" />
                </div>
                <div class="number">3453</div>
              </div>
            </div>
            <div class="label">免费</div>
          </div>
        </div>
        <div class="bottomLine aboveLine table">
          <div class="photograph">
            <img src="./images/course.png" />
          </div>
          <div class="details weui-flex">
            <div class="weui-flex__item">
              <div class="designation">小白学炒股</div>
              <div class="particulars weui-flex">
                <div class="ico">
                  <img src="./images/number.png" />
                </div>
                <div class="number">已有<span>2000</span>人学习</div>
                <div class="like ico">
                  <img src="./images/like.png" />
                </div>
                <div class="number">3453</div>
              </div>
            </div>
            <div class="label">免费</div>
          </div>
        </div>
        <div class="bottomLine aboveLine table">
          <div class="photograph">
            <img src="./images/course.png" />
          </div>
          <div class="details weui-flex">
            <div class="weui-flex__item">
              <div class="designation">小白学炒股</div>
              <div class="particulars weui-flex">
                <div class="ico">
                  <img src="./images/number.png" />
                </div>
                <div class="number">已有<span>2000</span>人学习</div>
                <div class="like ico">
                  <img src="./images/like.png" />
                </div>
                <div class="number">3453</div>
              </div>
            </div>
            <div class="label">免费</div>
          </div>
        </div>
        <div class="loading-container">
          <Loading v-show="loadingFlag" title="正在加载"></Loading>
        </div>
      </div>
    </Scroll>
    <!--课程列表 end-->
    <!--筛选弹出层 start-->
    <Filtrate :visible.sync="filtrateFlag" ref="filtrate" @sure="filtrateCall"></Filtrate>
    <!--筛选弹出层 end-->
  </div>
</template>

<script>
  import weui from 'weui.js'
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'
  import Filtrate from '@/base/dialog/filtrate'
  export default {
    name: 'HelloWorld',
    components: {
      Scroll,
      Loading,
      Filtrate
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        tel: 13151297760,
        // 切换课程标签
        option: 0,
        // 滚动区域的高度
        scrollHeight: 300,
        // 滚动事件只触发一次
        eventFlag: true,
        // 上拉加载开关
        pulldown: true,
        // 显示loading
        loadingFlag: true,
        filtrateFlag: false
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
      },
      // 切换课程
      cut(index) {
        this.option = index
      },
      // 点击筛选
      filtrate(){
        this.$refs.filtrate.init()
        this.filtrateFlag = true
      },
      // 筛选回调
      filtrateCall(i) {
        console.log(i)
      },
      // 初始化scroll的高度
      _initScroll() {
        let height = document.documentElement.clientHeight || document.body.clientHeight
        console.log(height)
        this.scrollHeight = height - 85
      },
      // 上拉加载
      scrollToEnd(){
        this.loadingFlag = true
        console.log('dd')
        setTimeout(()=>{
          this.loadingFlag = false
          this.eventFlag = true
        }, 2000)
        // getPostData('getPigOrderList', {}, true).then(r => {
        //   this.list = this.list.concat(r.list)
          
        // })
      }
    },
    mounted() {
      document.title = "慧鲸学堂"
      
      this._initScroll()
    },
    // 组件激活时调用
    activated() {
      this.$refs.scroll.reLive()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
.login
  .options
    height cp(50)
    width cp(384)
    margin cp(25) auto
    margin-bottom cp(25)
    font-size cp(30)
    line-height cp(50)
    .classical
      width cp(160)
      margin-left cp(16)
      margin-right cp(16)
      color #000
      border 1px solid $hui
    .individual
      width cp(160)
      margin-left cp(16)
      margin-right cp(16)
      color #000
      border 1px solid $hui
    .pitchOn
      color #2c6fff
  .menu
    height cp(70)
    line-height cp(70)
    .weui-flex__item
      &:active
        background #cecece
    .item
      width cp(122)
      font-size cp(28)
      margin 0 auto
      .pullDown
        &:after
          content:'';
          background-image:url(./images/pullDown.png);
          background-size cp(32) cp(32)
          position absolute
          top cp(15)
          width cp(32)
          height cp(32)
      .filtrate
        position absolute
        &:before
          content:'';
          background-image:url(./images/filtrate.png);
          background-size cp(32) cp(32)
          position absolute
          top cp(16)
          width cp(32)
          height cp(32)
          right cp(65)
  .roll
    height 200px
    overflow hidden
    background #e3e3e3
  .curriculums
    padding-top cp(20)
    background #e3e3e3
    .table
      background #fff
      padding-top cp(25)
      padding-bottom cp(25)
      margin-bottom cp(20)
      .photograph
        padding-left cp(30)
        padding-right cp(30)
        img
          width 100%
      .details
        height cp(62)
        margin-top cp(20)
        margin-left cp(30)
        margin-right cp(30)
        .particulars
          margin-top cp(18)
          font-size cp(24)
          line-height cp(32)
          .ico
            width cp(32)
            height cp(32)
            img
              width 100%
              height 100%
          .number
            margin-left cp(15)
            span
              color #ff0515
          .like
              margin-left cp(30)
      .designation
        text-align left
        font-size cp(24)
        line-height cp(24)
      .label
        width cp(100)
        text-align center
        line-height cp(62)
        color #ff0515
        font-size cp(30)
    .loading-container
      height cp(90)
</style>
