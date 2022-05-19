<template>
	<view class="">
		<view class='address_from'>
			<u-form :model="form" ref="uForm" label-width='160rpx'>
				<u-form-item label="联系姓名" required prop="name">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="联系电话" required prop="phone">
					<u-input v-model="form.phone" />
				</u-form-item>
				<u-form-item label="选择城市" required prop="city">
					<u-input v-model="input" type="select" @click="value = true" />
				</u-form-item>
				<u-form-item label="详细地址" required prop="address">
					<u-input v-model="form.address" />
				</u-form-item>
				<u-form-item label="是否默认">
					<u-switch slot="right" v-model="is_default"></u-switch>
				</u-form-item>
				<city-select v-model="value" @city-change="cityChange"></city-select>
			</u-form>
			<u-button shape="square" type="success" class='btn' @click='modifyAddress'>{{ isModify ? '修改地址' : '新建地址'}}
			</u-button>
		</view>
	</view>
</template>

<script>
	import citySelect from './u-city-select.vue';
	export default {
		components: {
			citySelect
		},
		data() {
			return {
				value: false,
				is_default: false,
				isModify: false,
				input: '',
				form: {
					name: '',
					phone: '',
					address: '',
					province: '',
					city: '',
					county: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}],
					// 字段名称
					phone: [{
							required: true,
							errorType: ['message'],
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							errorType: ['message'],
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					],
					city: [{
						required: true,
						message: '请选择城市',

						trigger: ['change', 'blur']
					}],
					address: [{
						required: true,
						message: '请输入详细地址',
						trigger: ['change', 'blur']
					}],
				}
			};
		},
		methods: {
			cityChange(e) {
				this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
				this.form.province = e.province.label
				this.form.city = e.city.label
				this.form.county = e.area.label
			},
			modifyAddress() {
				const that = this
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						const {
							name,
							address,
							phone,
							province,
							city,
							county
						} = this.form
						let params = {
							name,
							address,
							phone,
							province,
							city,
							county
						}
						if (this.is_default) {
							params.is_default = 1
						}
						if (this.isModify) {
							await this.$u.api.modifyAddress(this.form.id, params)
							this.$u.toast('修改地址成功')
						} else {
							await this.$u.api.addAddress(params)
							this.form = {
								name: '',
								phone: '',
								address: '',
								province: '',
								city: '',
								county: '',
							}
							this.input = ''
							this.$u.toast('添加地址成功')
						}
					} else {
						console.log('验证失败');
					}
				});

			}
		},
		onLoad(options) {
			const index = options.addressIndex || ''
			if (index) {
				if (!this.vuex_address[0]) return
				this.form = this.vuex_address[index]
				this.input = this.form.province + '-' + this.form.city + '-' + this.form.county;
				this.isModify = true
			} else {
				this.isModify = false
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>

<style lang="scss">
	.address_from {
		margin: 40rpx;
	}

	.btn {
		width: 80%;
	}
</style>
