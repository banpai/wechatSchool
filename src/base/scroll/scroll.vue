<template>
  <div ref="wrapper">
    <div>
      <div class="tip" v-show="flag">{{name}}</div>
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        flag: false,
        name: '下拉刷新',
        height: 0
      }
    },
    props: {
      /** 1 滚动的时候会派发scroll事件，会截流。 
       *  2 滚动的时候实时派发scroll事件，不会截流。
       *  3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件 
       */
      probeType: {
        type: Number,
        default: 1
      },
      /** * 点击列表是否派发click事件 */
      click: {
        type: Boolean,
        default: true
      },
      /** 是否派送事件 */
      eventFlag: {
        type: Boolean,
        default: true
      },
      /** * 是否开启横向滚动 */
      scrollX: {
        type: Boolean,
        default: false
      },
      /** * 是否派发滚动事件 */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /** * 列表的数据 */
      data: {
        type: Array,
        default: null
      },
      /** * 是否派发滚动到底部的事件，用于上拉加载 */
      pullup: {
        type: Boolean,
        default: false
      },
      /** * 是否派发顶部下拉的事件，用于下拉刷新 */
      pulldown: {
        type: Boolean,
        default: false
      },
      /** * 是否派发列表滚动开始的事件 */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /** * 当数据更新后，刷新scroll的延时。 */
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      // 保证在DOM渲染完毕后初始化 better-scroll 
      setTimeout(
        () => {
          this._initScroll()
        }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX
        })
        // 是否派发滚动事件
        if (this.listenScroll) {
          let me = this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        // 是否派发滚动到底部事件，用于上拉加载 
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              if (this.eventFlag) {
                this.$emit('update:eventFlag', false)
                this.$emit('scrollToEnd')
              }
            }
          })
        }
        // 是否派发顶部下拉事件，用于下拉刷新 
        if (this.pulldown) {
          var vm = this
          this.scroll.on('scroll', (pos) => {
            if (pos.y > 10) {
              this.flag = true
            } else {
              this.name = '下拉刷新'
              this.flag = false
            }
            if (pos.y > 50) {
              this.name = '释放加载'
            } else {
              this.name = '下拉刷新'
            }
          })
          this.scroll.on('touchEnd', (pos) => {
            this.name = '下拉刷新'
            this.flag = false
            // 下拉动作
            if (pos.y > 50) {
              if (this.eventFlag) {
                this.$emit('update:eventFlag', false)
                console.log('加载')
                this.$emit('pulldown')
              }
            }
          })
        }
        // 是否派发列表滚动开始的事件 
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            if (this.eventFlag) {
              this.$emit('update:eventFlag', false)
              this.$emit('beforeScroll')
            }
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法 
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法 
        this.scroll && this.scroll.enable()
      },
      reLive() {
        if (this.scroll) {
          this.scroll.destroy()
        }
        this._initScroll()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法 
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法 
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常 
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.tip
  text-align center
  height 25px
  line-height 25px
  font-size: 14px
</style>
