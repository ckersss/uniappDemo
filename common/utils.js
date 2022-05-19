const install = (Vue, vm) => {

	const isLogin = function() {
		const token = vm.vuex_token
		if (!token) {
			//获取跳转前页面url
			const currentPage = getCurrentPages().pop()
			console.log(currentPage)
			let goodsId = null
			if(currentPage.options.id) {
				goodsId = currentPage.options.id
			}
			console.log(goodsId)
			const last_url = `${currentPage.route}${goodsId ? '?id='+goodsId : ''}`
			console.log(last_url)
			vm.$u.toast('请先登录！')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirectTo',
					url: 'pages/user/login',
					params: {
						last_url 
					}
				})
			}, 1200)
			return false
		}
		return true
	}
	
	//更新本地用户信息
	const updateUser = async ()=>{
		//缓存用户信息
		const userInfo = await vm.$u.api.userInfo()
		vm.$u.vuex('vuex_user',userInfo)
	}

	vm.$u.utils = {
		isLogin,
		updateUser
	};
}

export default {
	install
}
