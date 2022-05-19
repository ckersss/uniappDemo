<template>
	<view class="navigation">
		<view class="left">
			<view class="item" @click="collect">
				<block v-if="isCollect == 0">
					<u-icon name="star" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">收藏</view>
				</block>
				<block v-else>
					<u-icon name="star-fill" :size="40" color="red"></u-icon>
					<view class="text u-line-1" style="color:red">已收藏</view>
				</block>
			</view>
			<view class="item car" @click="toCart">
				<u-badge class="car-num" :count="cartsCount" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1" >购物车</view>
			</view>
		</view>
		<view class="right">
			<view class="cart btn u-line-1" @click="addCarts">加入购物车</view>
			<view class="buy btn u-line-1">立即购买</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cartsCount:0,
		}
	},
	props:{
		isCollect:{
			type:Number,
			default:0
		},
		goodsId:{
			type:Number
		}
	},
	mounted(){
		if(this.vuex_token) {
			this.getCarts()
		}
	},
	methods: {
		async collect() {
			//收藏物品
			if(!this.$u.utils.isLogin())  return
			const res =  await this.$u.api.collectGoods(this.goodsId)
			const state = this.isCollect == 0 ? 1 : 0
			this.$emit('changeCollect',state)
			if (state) {
				this.$u.toast('收藏成功！')
			} else {
				this.$u.toast('取消收藏成功！')
			}
		},
		async addCarts() {
			//添加商品到购物车
			if(!this.$u.utils.isLogin())  return
			const params = {
				goods_id: this.goodsId
			}
			const res = await this.$u.api.addCarts(params)
			this.$u.toast('加入购物车成功')
			this.getCarts()
		},
		async getCarts() {
			//获取购物车列表数量
			const res = await this.$u.api.getCarts()
			this.cartsCount = res.data.length
		},
		toCart() {
			this.$u.route({
				type:'tab',
				url:"pages/cart/cart"
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.navigation {
	display: flex;
	margin-top: 100rpx;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 16rpx 0;
	justify-content: space-around;
	.left {
		display: flex;
		font-size: 20rpx;
		.item {
			text-align: center;
			margin: 0 30rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		display: flex;
		font-size: 28rpx;
		align-items: center;
		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}
		.cart {
			background-color: #ed3f14;
			margin-right: 30rpx;
		}
		.buy {
			background-color: #ff7900;
		}
	}
}
</style>
