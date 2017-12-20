<template>
  <div class="rouletteWheel">
    <div id="spin_button" @click="run">旋转</div>
    <canvas id="canvas" width="500" height="500"></canvas>
  </div>
</template>

<script>
  /**半拍
   * 大转盘
   */
  var wheel = (function() {
    let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      conflag = true,
      OUTSIDE_RADIUAS = 200, // 转盘的半径
      INSIDE_RADIUAS = 0, // 用于非零环绕原则的内圆半径
      TEXT_RADIUAS = 160, // 转盘内文字的半径
      CENTER_X = canvas.width / 2,
      CENTER_Y = canvas.height / 2,
      awards = [],
      _spinningChange = 30, //旋转弧度
      i = 0,
      callback, // 回调
      startRadian = 0, // 绘制奖项的起始角，改变该值实现旋转效果
      awardRadian = (Math.PI * 2) / awards.length, // 每一个奖项所占的弧度
      duration = 4000, // 旋转时间
      velocity = 20, // 旋转速率
      spinningTime = 0, // 旋转当前时间
      spinTotalTime, // 旋转时间总长
      runNumber = 200, // 执行次数
      spinningChange; // 旋转变化值的峰值
    /**
     * 缓动函数，由快到慢
     * @param {Num} t 当前时间
     * @param {Num} b 初始值
     * @param {Num} c 变化值
     * @param {Num} d 持续时间
     */
    function easeOut(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    /**
     * 绘制转盘
     */
    function drawRouletteWheel() {
      // ----- ① 清空页面元素，用于逐帧动画
      context.clearRect(0, 0, canvas.width, canvas.height);
      // -----
      for (let i = 0; i < awards.length; i++) {
        let _startRadian = startRadian + awardRadian * i, // 每一个奖项所占的起始弧度
          _endRadian = _startRadian + awardRadian; // 每一个奖项的终止弧度
        // ----- ② 使用非零环绕原则，绘制圆盘
        context.save();
        if (i % 2 === 0) context.fillStyle = '#FF6766'
        else context.fillStyle = '#FD5757';
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, OUTSIDE_RADIUAS, _startRadian, _endRadian, false);
        context.arc(canvas.width / 2, canvas.height / 2, INSIDE_RADIUAS, _endRadian, _startRadian, true);
        context.fill();
        context.restore();
        // -----
        // ----- ③ 绘制文字
        context.save();
        context.font = 'bold 16px Helvetica, Arial';
        context.fillStyle = '#FFF';
        context.translate(
          CENTER_X + Math.cos(_startRadian + awardRadian / 2) * TEXT_RADIUAS,
          CENTER_Y + Math.sin(_startRadian + awardRadian / 2) * TEXT_RADIUAS
        );
        context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
        context.fillText(awards[i], -context.measureText(awards[i]).width / 2, 0);
        context.restore();
        // -----
      }
      // ----- ④ 绘制指针
      context.save();
      context.beginPath();
      context.moveTo(CENTER_X, CENTER_Y - OUTSIDE_RADIUAS + 8);
      context.lineTo(CENTER_X - 10, CENTER_Y - OUTSIDE_RADIUAS);
      context.lineTo(CENTER_X - 4, CENTER_Y - OUTSIDE_RADIUAS);
      context.lineTo(CENTER_X - 4, CENTER_Y - OUTSIDE_RADIUAS - 10);
      context.lineTo(CENTER_X + 4, CENTER_Y - OUTSIDE_RADIUAS - 10);
      context.lineTo(CENTER_X + 4, CENTER_Y - OUTSIDE_RADIUAS);
      context.lineTo(CENTER_X + 10, CENTER_Y - OUTSIDE_RADIUAS);
      context.closePath();
      context.fill();
      context.restore();
      // -----
    }
    /**
     * 旋转结束，获取值
     */
    function getValue() {
      let startAngle = startRadian * 180 / Math.PI, // 弧度转换为角度
        awardAngle = awardRadian * 180 / Math.PI,
        pointerAngle = 90, // 指针所指向区域的度数，该值控制选取哪个角度的值
        overAngle = (startAngle + pointerAngle) % 360, // 无论转盘旋转了多少圈，产生了多大的任意角，我们只需要求到当前位置起始角在360°范围内的角度值
        restAngle = 360 - overAngle, // 360°减去已旋转的角度值，就是剩下的角度值
        index = Math.floor(restAngle / awardAngle); // 剩下的角度值 除以 每一个奖品的角度值，就能得到这是第几个奖品
      return awards[index];
    }
    /**
     * 开始旋转
     */
    var timeNumber = 0
    function rotateWheel() {
      // 当 当前时间 大于 总时间，停止旋转，并返回当前值
      spinningTime += 20
      if (spinningTime >= spinTotalTime) {
        startRadian = awardRadian * (5 - i)
        drawRouletteWheel();
        if(callback){
          callback(getValue())
        }
        return
      }
      // timeNumber = timeNumber + 1;
      // if (timeNumber > runNumber) {
      //   console.log(getValue());
      //   return
      // }
      let _spinningChange2 = (spinningChange - easeOut(spinningTime, 0, spinningChange, spinTotalTime)) * (Math.PI / 180);
      startRadian += _spinningChange2
      drawRouletteWheel();
      window.requestAnimationFrame(rotateWheel);
    }
    /**
     * 计算结果
     */
    function run() {
      spinningTime = 0; // 初始化当前时间
      spinTotalTime = duration; // 随机定义一个时间总量
      spinningChange = velocity; // 随机顶一个旋转速率
      // i = ii
      // // 计算转好的角度 6-0 - 1 = 5  6 - 1 -1 4 2 3
      // let startRadian2 =  awardRadian * (i - 1)
      // let startAngle = startRadian2 * 180 / Math.PI, // 弧度转换为角度
      //   awardAngle = awardRadian * 180 / Math.PI,
      //   pointerAngle = 90, // 指针所指向区域的度数，该值控制选取哪个角度的值
      //   overAngle = (startAngle + pointerAngle) % 360, // 无论转盘旋转了多少圈，产生了多大的任意角，我们只需要求到当前位置起始角在360°范围内的角度值
      //   restAngle = 360 - overAngle, // 360°减去已旋转的角度值，就是剩下的角度值
      //   index = Math.floor(restAngle / awardAngle); // 剩下的角度值 除以 每一个奖品的角度值，就能得到这是第几个奖品
      // console.log(startAngle)
      // console.log('mmmm' + awards[index]);
      rotateWheel();
    }
    /**
     * 开始
     */
    function start(m) {
      // 配置奖品
      if (m.awards) {
        awards = m.awards
        awardRadian = (Math.PI * 2) / awards.length
      }
      // 配置中奖参数
      if (m.index) {
        i = m.index
      }
      if(m.callback){
        callback = m.callback
      }
      // 配置时间
      // if(m.time){
      //   duration = m.time
      // }
      drawRouletteWheel()
      // 配置个数
      i = m.index
    }
    return {
      start: start,
      run: run
    }
  })
  export default {
    data(){
      return{
        wheel: {}
      }
    },
    methods: {
      // 初始化
      init(wheelData) {
        this.wheel = wheel()
        this.wheel.start(wheelData)
      },
      // 旋转
      run() {
        this.wheel.run()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.rouletteWheel
  position absolute
  height 350px
  width 350px
  top 50%
  margin-top -175px
  right 50%
  margin-right -175px
  #spin_button
    position absolute
    width 50px
    height 50px
    left 50%
    top 50%
    margin-left -25px
    margin-top -25px
    line-height 50px
    text-align center
    background yellow
    border-radius 100%
    cursor pointer
  #canvas
    height 350px
    width 350px
</style>