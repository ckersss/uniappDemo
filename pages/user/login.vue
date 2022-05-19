<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			<u-form ref="validateFormRef" :model="validateForm.value">
				<u-form-item label="账号" prop="username" :border-bottom="false">
					<u-input class="u-border-bottom" v-model="validateForm.value.username" placeholder="请输入账号" />
				</u-form-item>
				<u-form-item label="密码" prop="password" :border-bottom="false">
					<u-input type="password" class="u-border-bottom" v-model="validateForm.value.password"
						placeholder="请输入密码" />
				</u-form-item>
			</u-form>
			<button @click="submit" :style="[inputStyle]" class="loginBtn">登录</button>
			<view class="alternative">
				<view class="password" @click="toRegister">注册</view>
				<view class="issue" @click="">忘记密码</view>
			</view>
		</view>
		<view class="buttom">
			<div style="display: flex;">
				<div style="width: 100%"></div>
				<div style="padding: 66px;">
					<div @click="">
						<view class="icon">
							<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
						</view>
						微信
					</div>
				</div>
				<div style="width: 100%"></div>
			</div>
			<!--<view class="loginType">-->
			<!--<view class="wechat item">-->
			<!--<view class="icon">-->
			<!--<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>-->
			<!--</view>-->
			<!--微信-->
			<!--</view>-->
			<!--<view class="QQ item">-->
			<!--<view class="icon">-->
			<!--<u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon>-->
			<!--</view>-->
			<!--QQ-->
			<!--</view>-->
			<!--</view>-->
			<view class="hint" style="position: absolute; bottom: 0px;">
				<div style="margin-top: 10px; margin-bottom: 10px;">
					<!-- <official-account style="width: 100%;"></official-account> -->
				</div>

				登录代表同意
				<text class="link" @click="">uview商城模板用户协议、隐私政策，</text>
				并授权使用您的uview商城模板账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				validateForm: {
					value: {
						username: '',
						password: ''
					},
					rules: {
						username: [{
								required: true,
								message: '请输入邮箱号!',
								trigger: ['change', 'blur'],
							},
							{
								validator: (rule, value, callback) => {
									// 上面有说，返回true表示校验通过，返回false表示不通过
									// this.$u.test.mobile()就是返回true或者false的
									console.log('validator')
									return this.$u.test.email(value);
								},
								message: '请输入邮箱号!',
								trigger: ['change', 'blur']
							}

						],
						password: [{
								required: true,
								message: '请输入密码!',
								trigger: 'blur'
							},
							{
								pattern: /^(?=.*\S).+$/,
								message: '请输入密码!',
								trigger: 'blur'
							}
						]
					}
				}
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				const {
					username,
					password
				} = this.validateForm.value
				if (this.$u.test.email(username) && password) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		
		methods: {
			 submit(query) {
				 console.log(query)
				const _self = this;
				 _self.$refs.validateFormRef.validate(async valid => {
					if (valid) {
						const {username,password} = _self.validateForm.value
						console.log('验证通过', _self.validateForm.value);
						const params = {
							email: username,
							password: password
						}
						console.log(params)
						const loginRes = await _self.$u.api.authLogin(params)
						_self.$u.vuex('vuex_token',loginRes.access_token)
						//缓存用户信息
						await _self.$u.utils.updateUser()
						let url = ''
						if (_self.$mp) {
							url =  _self.$mp.query.last_url || 'pages/index/index'
						} else {
							url = _self.$route.query.last_url || 'pages/index/index'
						}
						// const url = _self.$route.query.last_url || 'pages/index/index'
						_self.$u.route({
							type:'reLaunch',
							url
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			toRegister() {
				uni.navigateTo({
					url:'/pages/user/register'
				})
			}
			/* wechatLogin() {
			    const _self = this;
			    new SysUserThirdLoginService().weixinLoginByUnionid().then(result => {
			        _self.loginResultHandle(result);
			    });
			},
			/* loginResultHandle(result) {
			    const _self = this;
			    if (result.status === 'success') {
			        _self.globalVariable.token = result.token;
			        _self.globalVariable.userInfo = result.userInfo;
			        _self.globalVariable.userInfo.unionid = result.unionid;
			        _self.globalVariable.orderSequenceNumber = result.orderSequenceNumber;  // 餐饮号，可能扫码时附带。

			        // 如果是审核账号，则屏蔽首页定制
			        if (_self.globalVariable.userInfo.username === "tgh004005") {
			            delete _self.globalVariable.userInfo.tbCommunity.tbCommunityHomeConfig;
			        }

			        if (_self.globalVariable.userInfo.tbCommunityUser.enabledLogin) {
			            LocalStorageUtil.setItem("token", _self.globalVariable.token);
			            LocalStorageUtil.setItem("userInfo", _self.globalVariable.userInfo);
			            CommonUtil.toastReLaunch("登录成功，正在跳转到首页", '/pages/sub/sub1-tabs/tabs/index');
			        } else {
			            CommonUtil.toast(`该账号禁止登录【${_self.globalVariable.userInfo.tbCommunityUser.tbCommunity.name}】请联系商城管理员。`, 5000);
			        }
			    } else {
			        if (result.message) {
			            CommonUtil.toast(result.message, 3000);
			        }
			    }
			} */
		},
		onReady() {
				this.$refs.validateFormRef.setRules(this.validateForm.rules);
			},
	};
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>
