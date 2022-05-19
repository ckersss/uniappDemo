<template>
	<navigator :url="'/pages/showGoods/showGoods?id=' + item.id" class="goods_item">
		<u-image width="100%" height="300rpx" class='u-skeleton-rect'
			:src="item.cover_url"></u-image>
			<view class="title u-line-1">
				{{item.title}}
			</view>
			<view class="u-flex u-row-between">
				<view class="price u-skeleton-rect">
				￥ {{item.price}}
				</view>
				<view class="sales u-skeleton-rect" >
					销量: {{item.sales}}
				</view>
			</view>
	</navigator>
</template>

<script>
	export default {
		name:"goods-card",
		data() {
			return {
				
			};
		},
		props:['item']
	}
</script>

<style lang="scss" scoped>
.goods_item {
		padding: 30rpx;
		margin-top: 30rpx;
		box-shadow: 0 12rpx 20rpx 0 rgba(0,0,0, .1);
		.title {
			font-size: 32rpx;
			margin: 10rpx 0;
		}
		.price {
			color: red;
			width: 30%;
		}
		.sales {
			color: #888;
			width: 30%;
		}
	}
</style>