<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-t-30 u-p-b-30">
			<view class="u-m-r-10">
				<oss-upload></oss-upload>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{vuex_user.email}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting-fill" title="个人信息" @click='toBaseInfo'></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="file-text-fill" title="我的订单"></u-cell-item>
				<u-cell-item icon="star-fill" title="商品收藏"></u-cell-item>
				<u-cell-item icon="map-fill" title="地址管理" @click='toAddress'></u-cell-item>
			</u-cell-group>
		</view>
		
		<u-button type="error" :custom-style="customStyle" @click='logout'><u-icon name="dengchu" custom-prefix="custom-icon" size='50'></u-icon>退出登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true,
				customStyle: {
								marginTop: '20rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
							}
			}
		},
		onLoad() {
			if(!this.$u.utils.isLogin())  return
		},
		methods: {
			toBaseInfo() {
				this.$u.route({
					type:'to',
					url:'pages/center/baseInfo'
				})
			},
			async logout() {
				await this.$u.api.logout()
				this.$u.vuex('vuex_token',null)
				this.$u.vuex('vuex_user',{})
				this.$u.toast('退出登录成功')
				setTimeout(()=>{
					uni.reLaunch({
						url:'/pages/index/index'
					})
				},1500)
			},
			toAddress() {
				uni.navigateTo({
					url:'/pages/address/address'
				})
			}
		},
		
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
