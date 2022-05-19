<template>
	<view>
		<u-swipe-action btn-width="200" :show="item.show" :index="index" v-for="(item, index) in addressList" :key="item.id"
			@click="click" @open="open" :options="options">
			<u-cell-item :arrow="false" :label='item.address' @click='setDefault(item.id)'>
				<view slot="title">{{item.province +'-'+ item.city +'-'+ item.county}}
					<view class="default" v-show="item.is_default == 1">
						默认
					</view>
				</view>
				<!-- 自定义右侧图标 -->
				<u-icon slot="right-icon" size="40" name="edit-pen-fill" @click = 'modifyAddress(index)'></u-icon>
			</u-cell-item>
		</u-swipe-action>

		<view class="add_address">
			<u-button shape="circle" type="error" @click='add_address'>
				<u-icon size="40" name="plus"></u-icon>新建收货地址
			</u-button>
		</view>
	</view>
	
	</view>
</template>

<script>
	let _this = {}
	export default {
		data() {
			return {
				addressList: [],
				canClick: false,
				btnWidth: 180,
				show: false,
				options: [{
						text: '设为默认',
						style: {
							backgroundColor: '#007aff',
							fontSize: '24rpx'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		methods: {
			async getAddressLilst() {
				const {data} = await this.$u.api.getAddress()
				data.forEach((item)=>{
					item.show = false
				})
				this.addressList = data
				this.$u.vuex('vuex_address',data)
				
			},
			//新建收货地址
			add_address() {
				uni.navigateTo({
					url: '/pages/addressMgt/addressMgt',
				});
			},
			//设置地址为默认 
			async setDefault(id) {
				if(!this.canClick) return
				await this.$u.api.setDefault(id)
				//uniapp返回上一级页面刷新页面    
				let pages = getCurrentPages(); // 当前页面        
				let beforePage = pages[pages.length - 2]; // 上一页        
				//beforePage.$vm.reFresh = Math.random()//触发上一页监听器
			    console.log("beforePage",beforePage);
				uni.navigateBack({
				    delta: 1,//返回上上一级注意这里要设置为2
				    success:function(){
				        beforePage.$vm.getOrders();
				        //console.log("返回成功!");
				    }
				})
			},
			modifyAddress(index) {
				this.$u.route({
					type: 'navigateTo',
					url: `pages/addressMgt/addressMgt?addressIndex=${index}`,
				})
			},
			click(index, index1) {
				const id  = this.addressList[index].id
				if (index1 == 1) {
					//删除地址
					this.$u.api.delAddress(id)
					this.addressList.splice(index, 1);
					this.$u.toast(`删除地址成功`);	
				} else {
					//设为默认
					_this.addressList[index].show = false
					this.$u.api.setDefault(id)
					this.addressList.forEach((item)=>{
						item.is_default = 0
					})
					this.addressList[index].is_default = 1
					
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				_this.addressList[index].show = true;
				_this.addressList.map((val, idx) => {
					if (index != idx) _this.addressList[idx].show = false;
				})
			}
		},
		onShow() {
			_this = this
			this.getAddressLilst()
			const currentPage = getCurrentPages()
			const last_url = currentPage.splice(-2,1)[0].route
			if(last_url == 'pages/orders/orders') {
				this.canClick = true
			}
		}
	}
</script>

<style lang="scss">
	.default {
		display: inline;
		padding: 0 6rpx;
		color: white;
		border: 1rpx solid red;
		background-color: red;
		border-radius: 20%;
	}

	.add_address {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 20rpx auto;
		width: 80%;
	}
</style>
