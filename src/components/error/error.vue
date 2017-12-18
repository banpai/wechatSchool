<template>
  <div class="contain">
    <div id="loading-center">
      <div id="loading-center-absolute">
        <img src="./null.png">
        <div v-text="warn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        warn: ''
      }
    },
    methods: {
      init() {
        console.log(this.$store.state.msg)
        if(this.$store.state.msg){
          this.warn = this.$store.state.msg
        }
      }
    },
    mounted() {
      // 初始化
      this.init()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .contain
    background-color: $color-main
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    margin-top: 0px;
    top: 0px;
    #loading-center
      width: 100%;
      height: 100%;
      position: relative;
      #loading-center-absolute
        position: absolute;
        left: 50%;
        top: 50%;
        height: 200px;
        width: 200px;
        margin-top: -100px;
        margin-left: -100px;
        line-height 200px
        text-align center
        color #fff
        div 
          display inline-block
          position absolute
          top 30px
          width 100%
          left 0
</style>