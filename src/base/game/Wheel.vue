<template>
	<div id="box" class="box" v-bind:style="'height:'+ wheelLen +'px;width:' + wheelLen + 'px;'">
		<div class="outer KinerLottery KinerLotteryContent">
		<img src="./static/images/lanren.png"></div>
		<!-- 大专盘分为三种状态：活动未开始（no-start）、活动进行中(start)、活动结束(completed),可通过切换class进行切换状态，js会根据这3个class进行匹配状态 -->
		<div class="inner KinerLotteryBtn start"></div>
	</div>
</template>

<script>
	/**半拍
	 * 大转盘
	 */
	import $ from '$'
	import win from 'win'
	export default {
		data() {
			return {
				wheel: {}
			}
		},
		props:{
			wheelLen: {
				
			}
		},
		methods: {
			// 初始化
			init() {
				var vm = this
				var whichAward = function(deg) {
					if ((deg > 330 && deg <= 360) || (deg > 0 && deg <= 30)) { //10M流量
						return "三网通流量 10M";
					} else if ((deg > 30 && deg <= 90)) { //IPhone 7
						return "iPhone7";
					} else if (deg > 90 && deg <= 150) { //30M流量
						return "三网通流量 30M";
					} else if (deg > 150 && deg <= 210) { //5元话费
						return "话费5元";
					} else if (deg > 210 && deg <= 270) { //IPad mini 4
						return "ipad mini4";
					} else if (deg > 270 && deg <= 330) { //20元话费
						return "话费20元";
					}
				}
				var KinerLottery = new win.KinerLottery({
					rotateNum: 8, //转盘转动圈数
					body: "#box", //大转盘整体的选择符或zepto对象
					direction: 0, //0为顺时针转动,1为逆时针转动
					disabledHandler: function(key) {
						switch (key) {
							case "noStart":
								alert("活动尚未开始");
								break;
							case "completed":
								alert("活动已结束");
								break;
						}
					}, //禁止抽奖时回调
					clickCallback: function() {
						//此处访问接口获取奖品
						function random() {
							return Math.floor(Math.random() * 360);
						}
						this.goKinerLottery(random());
					}, //点击抽奖按钮,再次回调中实现访问后台获取抽奖结果,拿到抽奖结果后显示抽奖画面
					KinerLotteryHandler: function(deg) {
						vm.$emit('callback')
					} //抽奖结束回调
				});
				vm.$emit('cbjs')
			}
		},
		mounted() {
			this.init()
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import './static/css/kinerLottery.css'
@import './static/css/normalize.css'

</style>