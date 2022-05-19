<template>
	<view class="u-p-l-40 u-p-r-40">
		<u-form :model="form" ref="uForm">
			<u-form-item label="昵称" prop="name" required>
				<u-input v-model="form.name" />
			</u-form-item>
			<u-form-item label="简介" prop="intro">
				<u-input v-model="form.intro" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
				intro: '',
			},
			rules: {
				name: [{
						required: true,
						message: '请输入昵称',
						trigger: 'blur',
					},
					{
						min: 3,
						max: 5,
						message: '昵称长度在3到5个字符',
						trigger: ['change', 'blur'],
					},
					{
						validator: (rule, value, callback) => {
							return this.$u.test.chinese(value);
						},
						message: '昵称必须为中文',						
						trigger: ['change', 'blur'],
					},
				],
			}
		};
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(async valid => {
				if (valid) {
					const params = {
						name: this.form.name
					} 
					const res = await this.$u.api.updateUserInfo(params)
					//缓存用户信息
					await this.$u.utils.updateUser()
					console.log(res)		
						this.$u.toast('修改成功！')
				} else {
					console.log('修改失败');
				}
			});
		}
	},
	computed:{
		
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules)
		this.form.name = this.vuex_user.name
	}
};
</script>