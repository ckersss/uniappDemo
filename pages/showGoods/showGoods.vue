<template>
	<view class="goodsInfo u-skeleton" >
		<view class="goods_item">
			<view class="goods_img">
				<u-image width="200rpx" height="320rpx" class='u-skeleton-rect' :src="goodsInfo.cover_url">
				</u-image>
			</view>
			<view class="title u-line-1 u-skeleton-rect">
				{{goodsInfo.title}}
			</view>
			<view class="u-flex u-row-between u-skeleton-rect">
				<view class="price">
					￥ {{goodsInfo.price}}
				</view>
				<view class="sales">
					销量: {{goodsInfo.sales}}
				</view>
			</view>
		</view>
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" bg-color='#f7f7f7' class="u-skeleton-rect"></u-tabs>
		<!-- 商品详情模块 -->
		<goodsInfo v-if="current == 0" :details='goodsInfo.details'></goodsInfo>
		<!-- 商品评论模块 -->
		<comment v-if="current == 1" :commmet='goodsInfo.commmet'></comment>
		<!-- 推荐商品模块 -->
		<recommend v-if="current == 2" :likeGoods='likeGoods'></recommend>
		<!-- 提交订单栏 -->
		<submitBar class='submitBar' :isCollect='goodsInfo.is_collect' :goodsId='goodsInfo.id' @changeCollect='changeCollect'></submitBar>
		<!--引用骨架屏组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '商品详情'
				}, {
					name: '商品评论',
					count: 5
				}, {
					name: '推荐商品'
				}],
				current: 0,
				goodsInfo:{},
				likeGoods:[],
				loading:true
			}
		},
		onLoad(id) {
			console.log(id)
			this.getData(id.id)
		},
		methods: {
			change(index) {
				this.current = index;
			},
			async getData(id) {
				
				/* console.log(this)
				const {id} = this.options */
				const res = await this.$u.api.goodsInfo(id)
				this.loading = false
				this.goodsInfo = res.goods
				this.likeGoods = res.like_goods
			},
			changeCollect(value) {
				this.goodsInfo.is_collect = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsInfo {
		padding-bottom:84rpx ;
	}
	.goods_item {
		padding: 30rpx;
		margin-top: 30rpx;
		box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, .1);
		
		.goods_img {
			width: 100%;
			display: flex;
			justify-content: center;
		}

		.title {
			height: 40rpx;
			font-size: 32rpx;
			margin: 10rpx 0;
		}

		.price {
			color: red;
			width: 20%;
		}

		.sales {
			color: #888;
			width: 20%;
		}
		
	}
	.submitBar {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
