<template>
	<view>
		<u-upload ref="upload" :action="action"  :max-size="5 * 1024 * 1024" max-count="1"
			:before-upload="beforeUpload" :custom-btn='true' :form-data='formData' :multiple='false'
			@on-success='onSuccess'
			>
			<u-avatar :src="vuex_user.avatar_url" size="140" slot='addBtn'></u-avatar>
			</u-upload>
	</view>
</template>

<script>
	let _this = {}
	export default {
		name: "oss-upload",
		data() {
			return {
				action: '',
				formData: {},
				updateAvatarKey:'',
			};
		},
		methods: {
			//图片上传前钩子
			async beforeUpload(index, lists) {
				//先获取osstoken
				//获取上传域名
				//将文件名处理为唯一文件名 [list] 上传文件信息数组	
				//条件编译 H5和其它的储存key名不同
				const {file} = lists[0]
				console.log(lists[0])
				//#ifdef H5	
				const fileName = file.name
				//#endif
				//#ifndef H5
				const fileName = file.path
				//#endif
				//获取后缀名
				const ossToken = await _this.$u.api.authOssToken()
				const suffix = fileName.slice(fileName.lastIndexOf('.'))	
				//通过内置方法生成唯一文件名
				const upFileName = _this.$u.guid(20) + suffix
				_this.updateAvatarKey = upFileName	
				_this.formData = {
					'key':upFileName,
					'policy':ossToken.policy,
					'OSSAccessKeyId':ossToken.accessid,
					'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
					'signature':ossToken.signature,
				}
				console.log(_this.formData)
				_this.action = ossToken.host
				return true
			},
			//上传成功后的回调
			async onSuccess() {
				console.log("@@@")
				//请求API更新头像
				await _this.$u.api.updateAvatar({avatar:_this.updateAvatarKey})			
				//更新本地用户信息
				_this.$u.utils.updateUser()		
				_this.$u.toast('更新头像成功')
				//手动移除上传预览图片，显示已经上传好的头像
				_this.$refs.upload.remove(0)
			},
			onError(res) {
				console.log(res)
			}
		},
		created() {
			//防止微信小程序中this指向错误
			_this = this
		}
	}
</script>

<style>

</style>
