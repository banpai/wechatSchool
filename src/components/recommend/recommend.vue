<template>
  <div class="contain">
    <!--头部 start-->
    <div class="top">
      <div class="header">
        <div class="days">第<span class="num" v-text="userInfo.punchDays">1</span>天</div>
      </div>
      <div class="x_left">
        <div class="x_top">打卡时间</div>
        <div class="x_bottom" v-text="createTime"></div>
      </div>
      <div class="x_right">
        <div class="x_top">累计天数</div>
        <div class="x_bottom" v-text="count">1天</div>
      </div>
      <!--头像 start-->
      <div class="headimg">
        <img v-bind:src="userInfo.headimgurl" class="head_img" />
        <div class="warn_tip" v-show="false" v-text="like_count"></div>
        <div class="name" v-text="userInfo.nickname"></div>
      </div>
      <!--头像 end-->
    </div>
    <!--头部 end-->
    <div class="tianbu"></div>
    <!--中部 start-->
    <div class="center">
      <div class="c_tip" v-show="rank"><span v-text="date"></span>，排名第<span v-text="rank"></span>位，被赞<span v-text="like_count"></span>次</div>
      <div class="c_tip" v-show="!rank">暂无今天的数据</div>
      <div class="c_finger" @click="punch">
        <img src="./images/finger.png" class="finger" />
        <div class="state" v-text="punchstatue"></div>
      </div>
      <!--好友列表 start-->
      <div class="c_list">
        <ul v-show="discList.length">
          <li class="item" v-for="(item,index) in discList" :key="item.headimgurl">
            <div>
              <div class="i_cup">
                <img v-show="index === 0" src="./images/jb1.png" class="i_cup_img" />
                <img v-show="index === 1" src="./images/jb2.png" class="i_cup_img" />
              </div>
              <img :src="item.headimgurl" width="44" class="i_head" />
              <div class="i_text">
                <div class="i_text_top" v-text="item.nickname"></div>
                <div class="i_text_bottom" v-show="item.punchday && item.openid != userInfo.openid">共同打卡<span v-text="item.punchday"></span>天</div>
              </div>
              <!--提醒打卡 start-->
              <div class="i_btn" v-show="!item.punchTime" @click="warnPeople(item)">提醒</div>
              <!--提醒打卡 end-->
              <!--点赞的星星 start-->
              <div class="i_star" v-show="item.punchTime" @click="like(item.openid, item.likestatus, index)">
                <img v-show="item.likestatus" src="./images/star.png" class="i_star_img" />
                <img v-show="!item.likestatus" src="./images/star2.png" class="i_star_img" />
              </div>
              <!--点赞的星星 end-->
              <div class="i_time" v-text="item.punchTime?item.punchTime.substring(0, 5):''"></div>
            </div>
          </li>
        </ul>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
      </div>
      <!--好友列表 end-->
    </div>
    <!--中部 end-->
    <!--打卡图的图片合成 start-->
    <!-- <canvas id="dkt"></canvas> -->
    <!--打卡图的图片合成 end-->
    <!--尾部 start-->
    <div class="c_bottom">
      <div class="c_bottom_left">
        <div class="c_bottom_center" @click="sendcard">
          <img src="./images/yq.png" class="c_bottom_ewm" />
          <div class="c_bottom_text">生成邀请卡</div>
        </div>
      </div>
      <div class="c_bottom_right">
        <div class="c_bottom_center" @click="sendpunch">
          <img src="./images/yq.png" class="c_bottom_ewm" />
          <div class="c_bottom_text">生成打卡图</div>
        </div>
      </div>
    </div>
    <!--尾部 end-->
  </div>
</template>

<script>
  import weui from "weui.js";
  import Loading from "@/base/loading/loading";
  import {
    discList,
    punchDay,
    punchInit,
    likeDay,
    warnTip,
    sendInvitationCard,
    sendPunchCard,
    sendTest,
    ceAPI
  } from "@/api/init";
  // 合成打卡图的canvase方法
  var dktCanvas = (function() {
    // 绘制圆角矩形
    var createRoundRect = function(context, x1, y1, width, height, radius) {
      // 移动到左上角
      context.moveTo(x1 + radius, y1);
      // 添加一条连接到右上角的线段
      context.lineTo(x1 + width - radius, y1);
      // 添加一段圆弧
      context.arcTo(x1 + width, y1, x1 + width, y1 + radius, radius);
      // 添加一条连接到右下角的线段
      context.lineTo(x1 + width, y1 + height - radius);
      // 添加一段圆弧
      context.arcTo(x1 + width, y1 + height, x1 + width - radius, y1 + height, radius);
      // 添加一条连接到左下角的线段
      context.lineTo(x1 + radius, y1 + height);
      // 添加一段圆弧
      context.arcTo(x1, y1 + height, x1, y1 + height - radius, radius);
      // 添加一条连接到左上角的线段
      context.lineTo(x1, y1 + radius);
      // 添加一段圆弧
      context.arcTo(x1, y1, x1 + radius, y1, radius);
      context.closePath();
    }
    return {
      createRoundRect: createRoundRect
    }
  }());
  export default {
    name: "HelloWorld",
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        userInfo: {},
        discList: [],
        punchstatue: "打卡",
        createTime: "--:--",
        count: "1",
        centermsg: "",
        like_count: 0,
        rank: "",
        date: "",
        actionFlag: true,
        punchTime: ''
      };
    },
    methods: {
      /**
       * 初始化页面方法
       * 如果状态码是60001表示没有openid需要跳转到授权页面获取coed，重新获取openid
       * userinfo，个人信息
       * 
       */
      init() {
        ceAPI().then(r=>{
          console.log(r)
        })
        console.log("开始注册");
        var vm = this;
        punchInit().then(res => {
          console.log(res.msg);
          if (res.error_code === 60001) {
            window.location.href = res.msg;
          } else {
            if (res.userInfo) {
              this.userInfo = res.userInfo;
              localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
            } else {
              this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            }
            if (res.createTime) {
              this.punchTime = res.createTime;
              this.createTime = res.createTime.substring(0, 5);
              this.punchstatue = "已打卡";
            }
            if (res.count) {
              this.count = res.count;
            }
            if (res.like_count) {
              this.like_count = res.like_count;
            }
            vm.list();
          }
        });
      },
      /**
       * 加载列表数据
       * like_count：被赞次数
       * rank：排名
       * date：日期
       */
      list() {
        discList().then(r => {
          var vm = this;
          console.log(r);
          if (r.err_code === 0) {
            if (r.data[0]) {
              var openid = localStorage.getItem("openid");
              // 计算出共同打卡的天数
              if (r.punchdays[0]) {
                // 查询出我所有的打卡天数
                var myopenid = vm.userInfo.openid;
                var mypunchdata = [];
                for (let e of r.punchdays.values()) {
                  if (e.openid === myopenid) {
                    mypunchdata.push(e);
                  }
                }
                // 然后根据我所有的打卡天数计算出好友一起打卡的天数,一层嵌套，判断openid
                for (let e of r.data.values()) {
                  var openidli = e.openid;
                  e.punchday = 0;
                  // 二层嵌套，遍历我的打卡日期
                  for (let elem of mypunchdata.values()) {
                    var punchDate = elem.punchDate;
                    // 三层嵌套，判断出当天和我一起打卡的条件下，punchday加一
                    for (let v of r.punchdays.values()) {
                      if (openidli === v.openid && punchDate === v.punchDate) {
                        e.punchday = e.punchday + 1;
                      }
                    }
                  }
                }
                vm.discList = r.data;
              } else {
                vm.discList = r.data;
              }
              // 排名
              var rank = r.data.findIndex(function(value, index, arr) {
                return value.openid == openid;
              });
              if (rank != -1) {
                vm.rank = +rank + 1;
              }
              // 点赞数字
              // var like_count = 0;
              // for (let elem of r.data.values()) {
              //   if (elem.likestatus === "1") {
              //     like_count = like_count + 1;
              //   }
              // }
              // vm.like_count = like_count;
              // 打卡日期
              if (r.date) {
                var mouth = r.date.substring(5, 7);
                var day = r.date.substring(8, 10);
                // alert(day);
                vm.date = mouth + "月" + day + "日";
              }
            } else {
              var likestatus = 0;
              if (r.selflike) {
                likestatus = r.selflike.likestatus;
              }
              var punchTime = '';
              if (r.selfdata) {
                punchTime = r.selfdata.punchTime;
              }
              var data = {
                openid: vm.userInfo.openid,
                nickname: vm.userInfo.nickname,
                headimgurl: vm.userInfo.headimgurl,
                punchTime: punchTime,
                likestatus: likestatus
              }
              vm.discList.push(data);
            }
          }
        });
      },
      /**@augments
       *  执行任务的封装
       */
      doAction(cb) {
        if (this.actionFlag) {
          this.actionFlag = false
          return Promise.resolve()
        } else {
          weui.topTips("执行中，请稍后尝试");
        }
      },
      /**
       * 点击打卡
       * punchstatue判断打卡状态
       * createTime：打卡时间
       * count为打卡天数
       */
      punch() {
        this.doAction().then(() => {
          if (this.punchstatue === "已打卡") {
            weui.topTips("今天您已经打过卡了！");
            this.actionFlag = true
          } else {
            punchDay().then(res => {
              console.log(res);
              if (res.err_code === 0 || res.err_code === 2) {
                weui.toast("打卡成功", 3000);
                this.punchstatue = "已打卡";
                this.discList = [];
                this.list();
              }
              if (res.createTime) {
                this.punchTime = res.createTime;
                this.createTime = res.createTime.substring(0, 5);
              }
              if (res.count) {
                this.count = res.count;
              }
              if (res.punchDays) {
                this.userInfo.punchDays = res.punchDays;
              }
              this.actionFlag = true
            });
          }
        });
      },
      /**
       * 点赞方法
       * o：是好友的openid
       * err_code状态码是0，点赞成功
       */
      like(o, f, i) {
        this.doAction().then(() => {
          var vm = this;
          if (f) {
            weui.topTips("您已经点过赞了！");
            this.actionFlag = true
          } else {
            console.log(o);
            likeDay(o).then(res => {
              console.log(res);
              if (res.err_code === 0) {
                this.discList[i].likestatus = 1;
                weui.toast("点赞成功！", 3000);
                if (o == vm.userInfo.openid) {
                  this.like_count = +this.like_count + 1;
                }
                this.actionFlag = true
              } else {
                weui.topTips("点赞失败");
                this.actionFlag = true
              }
            });
          }
        })
      },
      /**
       * 点击提醒的方法
       * 
       */
      warnPeople(item) {
        this.doAction().then(() => {
          var vm = this;
          var params = {
            otheropenid: item.openid,
            nickname: vm.userInfo.nickname
          };
          warnTip(params).then(res => {
            weui.toast("提醒成功！", 3000);
            console.log(res);
            this.actionFlag = true
          });
        })
      },
      /**
       * 点击发送邀请卡
       */
      sendcard() {
        this.doAction().then(() => {
          var vm = this;
          var params = {
            headimgurl: vm.userInfo.headimgurl
          };
          var loading = weui.loading('生成打卡图中……', {
            className: 'custom-classname'
          });
          sendInvitationCard(params).then(res => {
            // weui.toast("生成成功", 3000);
            if (res.err_code === 0) {
              this.composeCard(res.data, (d) => {
                sendTest({
                  imgData: d
                }).then(r => {
                  loading.hide(function() {
                    console.log('`loading` has been hidden');
                  });
                  if (r.errcode === 0) {
                    weui.confirm('邀请卡已发送至公众号,是否返回公众号查看？', {
                      title: '生成邀请卡',
                      buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: function() {
                          console.log('no')
                        }
                      }, {
                        label: '确定',
                        type: 'primary',
                        onClick: function() {
                          WeixinJSBridge.call('closeWindow');
                        }
                      }]
                    });
                  } else {
                    weui.topTips("生成失败");
                  }
                });
                this.actionFlag = true
              });
            } else {
              loading.hide(function() {
                console.log('`loading` has been hidden');
              });
              if (res.msg) {
                weui.topTips(res.msg);
              } else {
                weui.topTips("服务器获取数据错误。");
              }
              this.actionFlag = true
            }
          });
        })
      },
      /**
       * 点击发送打卡图
       */
      sendpunch() {
        this.doAction().then(() => {
          var vm = this;
          var params = {
            headimgurl: vm.userInfo.headimgurl,
            punchTime: vm.punchTime
          };
          // 首先判断今天有没有打卡
          if (this.createTime === '--:--') {
            weui.topTips("您今天还没有打过卡！");
            this.actionFlag = true
          } else {
            var loading = weui.loading('生成打卡图中……', {
              className: 'custom-classname'
            });
            sendPunchCard(params).then(res => {
              // console.log(res);
              if (res.err_code === 0) {
                this.composePunch(res.data, (d) => {
                  sendTest({
                    imgData: d
                  }).then(r => {
                    loading.hide(function() {
                      console.log('`loading` has been hidden');
                    });
                    if (r.errcode === 0) {
                      weui.confirm('打卡图已发送至公众号,是否返回公众号查看？', {
                        title: '生成打卡图',
                        buttons: [{
                          label: '取消',
                          type: 'default',
                          onClick: function() {
                            console.log('no')
                          }
                        }, {
                          label: '确定',
                          type: 'primary',
                          onClick: function() {
                            WeixinJSBridge.call('closeWindow');
                          }
                        }]
                      });
                    } else {
                      weui.topTips("生成失败");
                    }
                  });
                  this.actionFlag = true
                });
              } else {
                loading.hide(function() {
                  console.log('`loading` has been hidden');
                });
                if (res.msg) {
                  weui.topTips(res.msg);
                } else {
                  weui.topTips("服务器获取数据错误。");
                }
                this.actionFlag = true
              }
            });
          }
        })
      },
      /**
       * 合成打卡图
       */
      composePunch(m, cb) {
        var vm = this;
        var width = 650;
        var height = 650;
        var canvasPunch = document.createElement('canvas');
        canvasPunch.width = width;
        canvasPunch.height = height;
        var ctx = canvasPunch.getContext('2d');
        // 画上背景图片
        var imgBg = new Image();
        imgBg.src = m.base64Bgurl;
        imgBg.onload = function() {
          ctx.save();
          ctx.drawImage(imgBg, 0, 0, 750, 750);
          ctx.restore();
          // 画出一个悬浮的透明背景框
          ctx.save();
          let rWidth = width - 120;
          let rHeight = 150;
          let rXpostion = (width - rWidth) / 2;
          let rHposition = (height - rHeight) / 2;
          dktCanvas.createRoundRect(ctx, rXpostion, rHposition, rWidth, rHeight, 8);
          ctx.fillStyle = "rgba(255, 255, 255, .6)";
          ctx.fill();
          ctx.restore();
          // 画出圆形头像
          var imgHead = new Image();
          imgHead.src = m.headimgurlbase64;
          imgHead.onload = function() {
            let hR = 50;
            let hHeight = 100;
            let hXposition = 160;
            let hYposition = height / 2;
            ctx.beginPath();
            // 绘制一个圆
            ctx.save();
            ctx.arc(hXposition, hYposition, hR, 0, 2 * Math.PI);
            ctx.clip();
            let width2 = 2 * hR;
            let height2 = 2 * hR;
            let hYposition2 = (height - height2) / 2;
            let hXposition2 = hXposition - hR;
            ctx.drawImage(imgHead, hXposition2, hYposition2, width2, height2); // 在刚刚裁剪的园上画图
            ctx.restore();
            // 绘制打卡时间的文字
            let dkY = height / 2;
            let dkX = width / 2 - 70;
            // ctx.textAlign="center";
            ctx.font = "normal small-caps normal 58px arial";
            var punchTime = vm.createTime;
            ctx.fillText(punchTime, dkX, dkY);
            // 绘制底部有多少人正在参与
            let dkY2 = height / 2 + 40;
            let dkX2 = width / 2 - 70;
            // ctx.textAlign="center";
            ctx.font = "normal small-caps normal 16px arial";
            var str = m.count + '人正在参与，比' + m.percent + '%的人起的晚';
            ctx.fillText(str, dkX2, dkY2);
            // 连续早起的文字绘制
            let dkY3 = (height / 2) + (rHeight / 2) + 50;
            let dkX3 = 60;
            // ctx.textAlign="center";
            ctx.font = "normal small-caps 500 20px arial";
            var str = '连续早起';
            ctx.fillText(str, dkX3, dkY3);
            // 天数的文字绘制
            let dkY4 = (height / 2) + (rHeight / 2) + 50 + 50;
            let dkX4 = 100;
            // ctx.textAlign="center";
            ctx.textAlign = "center";
            ctx.font = "normal small-caps 500 50px arial";
            var tianshu = String(m.days);
            ctx.fillText(tianshu, dkX4, dkY4);
            // 天的文字绘制
            let dkY5 = (height / 2) + (rHeight / 2) + 50 + 45;
            var ll = tianshu.length * 6;
            let dkX5 = 145 + ll;
            // ctx.textAlign="center";
            ctx.font = "normal small-caps 500 20px arial";
            var str = '天';
            ctx.fillText(str, dkX5, dkY5);
            // 日期的绘制
            let dkY6 = (height / 2) + (rHeight / 2) + 50 + 45 + 35;
            let dkX6 = 110;
            // ctx.textAlign="center";
            ctx.font = "normal small-caps 500 16px arial";
            var str = m.date.substring(0, 4) + '年' + m.date.substring(5, 7) + '月' + m.date.substring(8, 10) + '日';
            ctx.fillText(str, dkX6, dkY6);
            // 底部名人名言绘制
            let dkY7 = height - 30;
            let dkX7 = 60;
            ctx.textAlign = "start";
            ctx.font = "normal small-caps 500 23px arial";
            var str = m.wellKnow;
            ctx.fillText(str, dkX7, dkY7);
            // 画上二维码
            var imgewm = new Image();
            var ewmUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + m.codeResult.ticket;
            imgewm.src = m.codeBase64;
            imgewm.onload = function() {
              ctx.save();
              let eWidth = 120;
              let eHeight = 120;
              let eXposition = height - 55 - eHeight;
              let eYposition = width - 80 - eWidth;
              ctx.globalAlpha = 0.5;
              ctx.beginPath();
              ctx.drawImage(imgewm, eXposition, eYposition, eWidth, eHeight);
              ctx.closePath();
              ctx.restore();
              // 在二维码的底部画上文字
              let dkY8 = eYposition + 105 + 35;
              let dkX8 = eXposition;
              ctx.textAlign = "start";
              ctx.font = "normal small-caps 500 15px arial";
              var str = '扫码和我互道早安';
              ctx.fillText(str, dkX8, dkY8);
              var dataURL = canvasPunch.toDataURL('image/png', 1);
              cb(dataURL);
            }
          }
        }
      },
      /**
       * 合成邀请卡
       */
      composeCard(m, cb) {
        console.log(m);
        var width = 650;
        var height = 650;
        var canvasPunch = document.createElement('canvas');
        canvasPunch.width = width;
        canvasPunch.height = height;
        var ctx = canvasPunch.getContext('2d');
        // 画上背景图片
        var imgBg = new Image();
        imgBg.src = m.base64Bgurl;
        imgBg.onload = function() {
          ctx.save();
          ctx.drawImage(imgBg, 0, 0, 750, 750);
          ctx.restore();
          // 绘制鸡汤文字
          let dkY = height / 2 - 25;
          let dkX = width / 2;
          ctx.textAlign = "center";
          ctx.font = "normal small-caps normal 35px 微软雅黑";
          var punchTime = m.str1;
          ctx.fillText(punchTime, dkX, dkY);
          let dkYY = height / 2 + 25;
          let dkXX = width / 2;
          ctx.textAlign = "center";
          ctx.font = "normal small-caps normal 35px 微软雅黑";
          var punchTime = m.str2;
          ctx.fillText(punchTime, dkXX, dkYY);
          // 画出二维码的背景层
          ctx.save();
          let rWidth = 145;
          let rHeight = 145;
          let rXpostion = (width - rWidth) / 2;
          let rHposition = height - 130 - 63;
          dktCanvas.createRoundRect(ctx, rXpostion, rHposition, rWidth, rHeight, 8);
          ctx.fillStyle = "#00bdc9";
          ctx.fill();
          ctx.restore();
          // 画上二维码
          var imgewm = new Image();
          var ewmUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + m.codeResult.ticket;
          imgewm.src = m.codeBase64;
          imgewm.onload = function() {
            ctx.save();
            let eWidth = 130;
            let eHeight = 130;
            let eXposition = (width - eWidth) / 2;
            let eYposition = height - 55 - eHeight;
            ctx.beginPath();
            ctx.drawImage(imgewm, eXposition, eYposition, eWidth, eHeight);
            ctx.closePath();
            ctx.restore();
            // 画出圆形头像
            var imgHead = new Image();
            imgHead.src = m.headimgurlbase64;
            imgHead.onload = function() {
              let width2 = 36;
              let height2 = 36;
              let hYposition2 = height - 5 - eHeight;
              let hXposition2 = (width - width2) / 2;
              ctx.drawImage(imgHead, hXposition2, hYposition2, width2, height2); // 在刚刚裁剪的园上画图
              ctx.restore();
              // 在二维码的底部画上文字
              let dkY8 = eYposition + 105 + 55;
              let dkX8 = eXposition - 3;
              ctx.textAlign = "start";
              ctx.font = "normal small-caps 500 17px arial";
              var str = '扫码和我互道早安';
              ctx.fillStyle = '#ffffff';
              ctx.fillText(str, dkX8, dkY8);
              var dataURL = canvasPunch.toDataURL('image/png', 1);
              cb(dataURL);
            }
          }
        }
      }
    },
    mounted() {
      // 初始化
      this.init();
      // weui.alert('alert')
    },
    components: {
      Loading
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

@media all and (max-width: 320px) {
  .i_time {
    display: none !important;
  }
}

.contain {
  width: 100%;
  position: absolute;
  overflow-x: hidden;
  #dkt{
    border 1px solid #000
  }
  .top {
    border: 1px solid $color-main;
    margin: 0 auto;
    height: 400px;
    width: 600px;
    position: absolute;
    left: 50%;
    clear: both;
    margin-left: -300px;
    margin-top: -210px;
    background: $color-main;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;

    .header {
      border: 1px solid $color-main;
      width: 220px;
      height: 192px;
      margin: 100px auto;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      background: #fff;

      .days {
        font-size: 30px;
        color: $color-text-l;
        margin-top: 90px;
        line-height: 96px;

        .num {
          font-size: 45px;
          padding-left: 5px;
          padding-right: 5px;
        }
      }
    }

    .x_left {
      border: 1px solid $color-main;
      width: 150px;
      position: absolute;
      right: 50%;
      top: 290px;
      height: 50px;
      margin-right: 35px;
      font-size: 22px;
      color: $color-text-l;
    }

    .x_right {
      border: 1px solid $color-main;
      width: 150px;
      position: absolute;
      left: 50%;
      top: 290px;
      height: 50px;
      margin-left: 35px;
      font-size: 22px;
      color: $color-text-l;
    }

    .headimg {
      width: 67px;
      height: 67px;
      border: 2px solid #F7FAFA;
      position: absolute;
      top: 363px;
      right: 50%;
      margin-right: -33px;
      border-radius: 50%;

      .head_img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      .warn_tip {
        width: 30px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        left: 40px;
        top: -10px;
        background: red;
        color: #fff;
        font-size: 22px;
        border-radius: 50%;
      }

      .name {
        color: $color-text-l;
        font-size: 20px;
        margin-top: 15px;
      }
    }
  }

  .tianbu {
    height: 280px;
  }

  .center {
    width: 100%;
    clear: both;

    .c_tip {
      color: $color-text-d;
    }

    .c_finger {
      width: 86px;
      height: 86px;
      background: $color-second;
      margin: 0 auto;
      margin-top: 15px;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      border-top-right-radius: 50%;
      border-top-left-radius: 50%;

      .finger {
        width: 40px;
        margin-top: 10px;
      }

      .state {
        color: #fff;
        margin-top: 5px;
        font-size: 16px;
      }
    }

    .c_list {
      margin-top: 15px;
      margin-bottom: 80px;
      position: relative;

      .loading-container {
        position: absolute;
        width: 100%;
        top: 20px;
        transform: translateY(-50%);
      }

      .item {
        height: 44px;
        margin-bottom: 30px;

        .i_cup {
          width: 32px;
          height: 32px;
          float: left;
          margin-left: 13px;
          margin-top: 7px;

          .i_cup_img {
            width: 100%;
            height: 100%;
          }
        }

        .i_head {
          border-radius: 50%;
          float: left;
          margin-left: 15px;
        }

        .i_text {
          width: 100px;
          float: left;
          margin-left: 15px;
          margin-top: 5px;

          .i_text_top {
            text-align: left;
            color: $color-text-l;
          }

          .i_text_bottom {
            text-align: left;
            color: $color-text-d;
            margin-top: 3px;
          }
        }

        .i_time {
          float: right;
          margin-right: 20px;
          margin-top: 15px;
          color: $color-text-d;
        }

        .i_star {
          width: 60px;
          height: 32px;
          float: right;
          margin-right: 15px;
          margin-top: 5px;

          .i_star_img {
            width: 32px;
            height: 32px;
          }
        }

        .i_btn {
          width: 60px;
          height: 35px;
          float: right;
          margin-right: 15px;
          margin-top: 5px;
          background: $color-second;
          color: #fff;
          line-height: 35px;
          border-radius: 10px;
        }
      }
    }
  }

  .c_bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 50px;
    z-index: 1000;
    background: #fff;

    .c_bottom_left {
      background: $color-btn;
      height: 50px;
      float: left;
      width: 50%;
      border-radius: 10px;
      color: $color-text-l;
      clear: both;
    }

    .c_bottom_center {
      width: 128px;
      height: 50px;
      margin: 0 auto;

      .c_bottom_text {
        margin-top: 18px;
        float: left;
        margin-left: 15px;
      }

      .c_bottom_ewm {
        float: left;
        width: 32px;
        height: 32px;
        margin-top: 8px;
      }
    }

    .c_bottom_right {
      background: $color-btn;
      height: 50px;
      float: right;
      width: 50%;
      border-radius: 10px;
      color: $color-text-l;
    }
  }
}
</style>
