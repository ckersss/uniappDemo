const install = (Vue, vm) => {

	const isLogin = function() {
		const token = vm.vuex_token
		if (!token) {
			//获取跳转前页面url
			const currentPage = getCurrentPages().pop()
			vm.$u.toast('请先登录！')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirectTo',
					url: 'pages/user/login',
					params: {
						last_url: currentPage.route
					}
				})
			}, 1200)
			return false
		}
		return true
	}

	vm.$u.utils = {
		isLogin
	};
}

export default {
	install
}
