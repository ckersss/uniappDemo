<template>
	<view class="container">
		<view class="cartContainer">
			<view class="cartItem u-flex" v-for="item in cartsData" :key="item.id">
				<!-- 按钮样式 -->
				<view class='checkbox u-flex' @click="changeChecked(item.id,item.is_checked)">
					<view v-if="item.is_checked==1" class="chooseBox u-flex u-row-center u-col-center">
						<view class="chooseBtn">
							<u-icon name="checkbox-mark" color="#fff" size="34"></u-icon>
						</view>
					</view>
					<view v-else class="not_chooseBox u-flex u-row-center u-col-center">
						<view class="not_chooseBtn"></view>
					</view>
				</view>
				<!-- 右侧商品 -->
				<view class="cart_goods">
					<view class="goods_img">
						<u-image width="100%" height="100%" :src="item.goods.cover_url"></u-image>
					</view>
					<view class="goods_info u-flex">
						<view class="goods_title">
							{{item.goods.title}}
						</view>
						<view class="goods_classify">
							{{item.goods.description}}
						</view>
						<view class="goods_chooseNum">
							<view class="price"> 
								￥{{item.goods.price}}
							</view>
							<view class="subtract goods_choose_class goods_choose_btn" :class="item.num == 1 ? 'no_subtract':''"
								@click="subtract(item.id,item.num)" >
								<u-icon name="minus" color="gary" size="30"></u-icon>
							</view>
							<view class="goods_num goods_choose_class goods_choose_btn">
								{{item.num}}
							</view>
							<view class="add goods_choose_class goods_choose_btn" @click="add(item.id,item.num)">
								+
							</view>
							<view class="remove goods_choose_class" @click="removeGoods(item.id)">
								<u-icon name="trash" color="red" size="45"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="balance">
				<view class='checkbox u-flex'>
					<view class="chooseBox u-flex u-row-center u-col-center" @click="allCheck">
						<view class="chooseBtn" v-if="allChecked">
							<u-icon name="checkbox-mark" color="#fff" size="34"></u-icon>
						</view>
						<view  class="not_chooseBox u-flex u-row-center u-col-center" v-else>
							<view class="not_chooseBtn"></view>
						</view>
					</view>	
				</view>
				<view style="line-height: 80rpx;">
					全选
				</view>
				<view class="total">
					合计：<view class="total_price">￥{{total}}</view>
				</view>
				<u-button shape="circle" type="error" class="btn-style" @click='toPay'>去结算</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartsData: [],
				total: '',
				checked_ids:[],
				all_cartids:[],
				allChecked:true
			}
		},
		methods: {
			async getCartData() {
				const res = await this.$u.api.getCartsData()
				console.log(res)
				this.cartsData = res.data
				this.checked_ids = []
				this.all_cartids = []
				res.data.forEach((item)=>{
					this.all_cartids.push(item.id)
					if(item.is_checked==1) {
						this.checked_ids.push(item.id)
					}
				})
				if(this.checked_ids.length == res.data.length) {
					this.allChecked = true
				} else {
					this.allChecked = false
				}
				console.log(this.allChecked)
			},
			// 减少
			subtract(id, num) {
				const goodsCartId = id
				let goodsum 
				if (num > 1) {
					goodsum = num - 1
				} else return
				const params = {
					num: goodsum
				}
				this.modifyNum(id, params)
			},
			// 增加
			add(id, num) {
				const goodsCartId = id
				let goodsum = num + 1
				const params = {
					num: goodsum
				}
				this.modifyNum(id, params)
			},
			// 变更选中状态 {
				async changeChecked(id,check) {
					let cart_ids = []
					this.cartsData.forEach((item)=>{
						if(item.is_checked==1) {
							cart_ids.push(item.id)
						}
					})
					if(check == 0) {
						cart_ids.push(id)
					} else {
						let index = cart_ids.indexOf(id)
						cart_ids.splice(index,1)
					}
					const params = {
						cart_ids
					}
					await this.$u.api.changeCartsChecked(params)
					this.getCartData()		
			},
			// 全选
			async allCheck() {
				console.log(1)
				const params = {
					cart_ids:[]
				}
				if(this.checked_ids.length == this.all_cartids.length) {
					await this.$u.api.changeCartsChecked(params)
					
				} else {
					params.cart_ids = this.all_cartids
					await this.$u.api.changeCartsChecked(params)
				}
				this.getCartData()
				
			},
			//移除商品
			async removeGoods(id) {
				await this.$u.api.removeCartsGoods(id)
				await this.getCartData()
				this.$u.toast('移除商品成功')
			},
			async modifyNum(goodsCartId, params) {
				await this.$u.api.changeCartsGoodsNum(goodsCartId, params)
				this.getCartData()
			},
			toPay() {
				this.$u.route({
					url:'pages/orders/orders',
					type:'navigateTo'
				})
			}
		},
		computed: {},
		watch: {
			cartsData: {
				deep: true,
				handler() {
					const total = this.cartsData.reduce((total, item) => {
						let oneTotal = 0
						if (item.is_checked == 1) {
							oneTotal = item.num * item.goods.price
						}
						return total += oneTotal
					}, 0)
					this.total = parseFloat(total).toFixed(2)
				}
			}
		},
		onShow() {
			if(!this.$u.utils.isLogin())  return
			this.getCartData()
		}
	}
</script>

<style lang="scss">
	$width: 70rpx;
	.container {
		margin: 40rpx 40rpx 0rpx 40rpx;
	}
	.cartContainer {
		
		display: flex;
		flex-direction: column;
		padding-bottom: 200rpx;
		.cartItem {
			width: 100%;
			height: 240rpx;
			background-color: #fafafa;
			
			.checkbox {
				width: $width;
				height: 100%;
				background-color: white;
				flex-direction: column;
				justify-content: center;
			}
			.cart_goods {
				width: calc(100% - #{$width});
				height: 100%;
				padding: 20rpx 30rpx;
				display: flex;
				.goods_img {
					width: 240rpx;
					height: 220rpx;

				}

				.goods_info {
					width: 100%;
					height: 100%;
					flex-direction: column;

					.goods_title {
						font-size: 30rpx;
						width: 100%;
						height: 50rpx;

					}

					.goods_classify {
						font-size: 25rpx;
						color: gray;
						width: 100%;
						height: 50rpx;

					}

					.goods_chooseNum {
						display: flex;
						margin-top: 80rpx;
						width: 100%;
						height: 60rpx;

						// justify-content: space-between;
						.price {
							// width: 130rpx;
							flex: 1;
							font-size: 20rpx;
							line-height: 60rpx;
							font-weight: 700;
							color: red
						}

						.subtract {
							margin-left: 10rpx;
							font-size: 40rpx;
						}
						.no_subtract {
							background-color: #f7f7f7;
							color: #cccccc;
						}

						.goods_num {
							font-size: 30rpx;
						}

						.add {
							font-size: 40rpx;
						}

						.remove {
							margin-left: 10rpx;
							padding-top: 5rpx;
						}
					}
				}

			}
		}

		.not_chooseBox {
			width: 70rpx;
			height: 70rpx;

			.not_chooseBtn {
				width: 40rpx;
				height: 40rpx;
				background-color: #fff;
				border: 4rpx solid gray;
				border-radius: 50%;
			}
		}

		.chooseBox {
			width: 70rpx;
			height: 70rpx;

			.chooseBtn {
				width: 40rpx;
				height: 40rpx;
				background-color: #2979ff;
				border: 4rpx solid #2979ff;
				border-radius: 50%;
			}
		}

		.goods_choose_class {
			width: 60rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
		}

		.goods_choose_btn {
			background-color: #eeeeee;
			margin: 0 3rpx;
		}

		.balance {
			background-color: #fff;
			position: fixed;
			// #ifdef H5
			bottom: 100rpx;
			// #endif
			
			// #ifndef H5
			bottom:0;
			// #endif
			width: 100%;
			height: 100rpx;
			display: flex;
			z-index: 9;
			align-items: center;
			justify-content: space-between;

			.total {
				margin-left: 60rpx;
				width: 250rpx;
				line-height: 80rpx;

				.total_price {
					display: inline;
					color: red;
					font-weight: 900;
				}
			}

			.btn-style {
				margin-right: 50rpx;
				width: 200rpx;
			}
		}
	}
</style>
