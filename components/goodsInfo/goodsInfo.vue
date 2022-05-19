<template>
	<view>
		<u-parse :html="details"></u-parse>
	</view>
</template>

<script>
	export default {
		name: "goodsInfo",
		data() {
			return {
				content: `
						<p>露从今夜白，月是故乡明</p>
						<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
						`
			};
		},
		props:{
			details:{
				type:String,
				default:''
			}
		}
		
	}
</script>

<style lang="scss">

</style>
