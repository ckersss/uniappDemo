<template>
	<view class="content">
		<view class="wrap">
			<u-swiper :list="swiper_list" name='img_url' height='320'></u-swiper>
		</view>
		<u-tabs :list="tabs_list" bg-color='#f7f7f7' :is-scroll="false" :current="tabs_current" @change="tabs_change">
		</u-tabs>
		<u-row gutter="30" class='u-skeleton'>
			<u-col span="6" v-for="item in goods_list">
				<goods-card :item='item'></goods-card>
			</u-col>
		</u-row>
		<!--引用骨架屏组件-->
				<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				swiper_list: [],
				tabs_list: [{
					name: '分页'
				}, {
					name: '热销'
				}, {
					name: '推荐',
				}, {
					name: '最新'
				}, ],
				tabs_current: 0,
				goods_list:[{},{},{},{}],
				page:1,
				loading:true
			}
		},
		onLoad() {
			this.get_data()
		},
		onReachBottom() {
			this.page+=1
			this.get_data(this.page)
		},
		methods: {
			tabs_change(index) {
				this.tabs_current = index
				//切换分页，清空原来的商品
				this.goods_list = [{
						title:'',
						price:'',
						sales:''
					},{
						title:'',
						price:'',
						sales:''
					},{
						title:'',
						price:'',
						sales:''
					},{
						title:'',
						price:'',
						sales:''
					}]
				//分页初始化
				this.page =1
				this.get_data()
			},
			async get_data() {
				const params = {
					page:this.page
				}
				switch (this.tabs_current) {
					case 1 :params.sales = 1
					break;
					case 2 :params.recommend = 1
					break;
					case 3 :params.new = 1
					break;
				}
				const {slides,goods} = await this.$u.api.indexInfo(params)
				console.log(goods)
				this.swiper_list = slides.slice(0,5)
				// this.goods_list=this.goods_list.concat(goods.data)
				this.goods_list = this.goods_list.pop().title ? [...this.goods_list,...goods.data] : goods.data
				this.loading = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
