<template>
	<view>
		<view>
			<u-cell-item icon="map-fill" :title="titel" :label='label' @click='toAddress'></u-cell-item>
		</view>
		<view class="ordersCantainer">
			<view class="orders" v-for="item in carts" :key="item.id">
				<view class="orders_img">
					<u-image width="100%" height="100%" :src="item.goods.cover_url"></u-image>
				</view>
				<view class="orders_info">
					<view class="orders_title">
						{{item.goods.title}}
					</view>
					<view class="orders_price_num">
						<view class="price">
							￥{{item.goods.price}}
						</view>
						<view class="num">
							x{{item.num}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="orders_pay u-flex u-row-between">
			<view class="total" >
				<span>合计：</span><span v-html="total" class='total_price'></span>
			</view>	
			<view class="pay_btn">
				<u-button shape="circle" type="error" class="btn-style">提交订单并支付</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:[],
				carts:[],
				total:'',
				titel:'',
				label:''
			};
		},
		onLoad() {
			this.getOrders()
		},
		methods:{
			async getOrders() {
				const res = await this.$u.api.getOrders()
				this.carts = res.carts
				this.address = res.address
				this.getDefaultAddress()
				const total = res.carts.reduce((total, item) => {
					let oneTotal = 0
					if (item.is_checked == 1) {
						oneTotal = item.num * item.goods.price
					}
					return total += oneTotal
				}, 0)
				this.total = parseFloat(total).toFixed(2)
				let splitPrice = this.total.split(".");
				this.total = `<span style="font-size:12px;">￥</span>${splitPrice[0]}.<span style="font-size:12px;">${splitPrice[1]}</span>`
			},
			toAddress() {
				uni.navigateTo({
					url:'/pages/address/address'
				})
			},
			getDefaultAddress() {
				this.address.some((item)=>{
					if(item.is_default == 1 ) {
						this.titel = item.province + '-' + item.city + '-' + item.county
						this.label = item.address
						return true
					}
				})
			}
		},
		watch:{
			
		}
	}
</script>

<style lang="scss">
	.ordersCantainer {
		background-color: #fafafa;
		margin-top: 20rpx;
		padding: 20rpx 40rpx 100rpx 40rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		.orders {
			margin-bottom: 20rpx;
			width: 100%;
			display: flex;
			.orders_img {
				width: 240rpx;
				height: 220rpx;
			}
			.orders_info{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
		
	}
	.orders_price_num {
		display: flex;
		justify-content: space-between;
		.price {
			flex: 1;
			color: red;
			font-weight: 900;
		}
		.num {
			font-weight: 900;
		}
	}
	.orders_pay {
		width: 100%;
		bottom: 0;
		position: fixed;
		padding: 10rpx 40rpx;
		background-color: #e5e5e5;
	}
	.total_price {
		color: red;
		font-weight: 900;
	}
</style>
