// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let indexUrl = '/api/index';
let login = '/api/auth/login';
let userInfo_api = '/api/user';
let register_api = '/api/auth/register'

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	//首页数据
	let indexInfo = (params = {}) => vm.$u.get(indexUrl, params);
	
	//登陆信息
	const authLogin = (params = {}) => vm.$u.post(login,params)
	
	//获取用户信息
	const userInfo = (params = {}) => vm.$u.get(userInfo_api,params)
	
	//用户注册
	const register = (params = {}) => vm.$u.post(register_api,params)
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {indexInfo,authLogin,userInfo,register};
}

export default {
	install
}