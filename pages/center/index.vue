<template>
	<view class="content">
		个人中心
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {	
		/* const token = this.vuex_token
		if(!token) {
			this.$u.toast('请先登录！')
			setTimeout(()=>{
				this.$u.route({
					type:'redirectTo',
					url:'pages/user/login'
				})
			},1000)
		} */
		if(!this.$u.utils.isLogin())  return
		console.log(12321)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
