<template>
	<view>
		<u-row gutter="30" class='u-skeleton'>
			<u-col span="6" v-for="item in likeGoods.length !==0? likeGoods : 6">
				<goods-card :item='item'></goods-card>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name:"recommend",
		data() {
			return {
			};
		},
		props:{
			likeGoods:{
				type:Array,
				default:[]
			}
		}
	}
</script>

<style lang="scss">

</style>