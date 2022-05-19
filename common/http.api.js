// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let indexUrl = '/api/index';
let login = '/api/auth/login';
let userInfo_api = '/api/user';
let register_api = '/api/auth/register'
let logout_api = '/api/auth/logout'
let oss_token_api = '/api/auth/oss/token'
let update_avatar_api = '/api/user/avatar'
let collect_goods_api = '/api/collects/goods/'
let add_carts_api = '/api/carts'
let getGoods_api = '/api/goods'
let goods_checked_api = '/api/carts/checked'
let orders_perview_api = '/api/orders/preview'
let upAddress_api = '/api/address'

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	//首页数据
	let indexInfo = (params = {}) => vm.$u.get(indexUrl, params);
	
	//用户登陆
	const authLogin = (params = {}) => vm.$u.post(login,params)
	
	//退出登录
	const logout = (params = {}) => vm.$u.post(logout_api,params)
	
	//获取用户信息
	const userInfo = (params = {}) => vm.$u.get(userInfo_api,params)
	
	//更新用户信息
	const updateUserInfo = (params = {}) => vm.$u.put(userInfo_api,params)
	
	//获取oss-token
	const authOssToken = (params = {}) => vm.$u.get(oss_token_api,params)
	
	//更新服务器头像url信息
	const updateAvatar = (params = {}) => vm.$u.post(update_avatar_api,params)
	
	//用户注册
	const register = (params = {}) => vm.$u.post(register_api,params)
	
	//商品详细信息
	const goodsInfo = (goodId ='') => vm.$u.get(`/api/goods/${goodId}`)
	
	//获取商品分类
	const getGoodsList = (params = {}) => vm.$u.get(getGoods_api,params)
	
	//收藏商品
	const collectGoods = (goodId) => vm.$u.post(`${collect_goods_api}${goodId}`)
	
	//添加购物车
	const addCarts = (params = {}) => vm.$u.post(add_carts_api,params)
	
	//获取购物车列表
	const getCarts = (params = {}) => vm.$u.get(add_carts_api,params)
	
	//获取购物车商品数据
	const getCartsData = (params = {}) => vm.$u.get('/api/carts?include=goods',params)
	
	//操作购物车物品数量
	const changeCartsGoodsNum = (id = '',params) => vm.$u.put(`${add_carts_api}/${id}`,params)
	
	//更改购物车物品选中状态
	const changeCartsChecked = (params) => vm.$u.patch(goods_checked_api,params)
	
	//移除商品 
	const removeCartsGoods = (id = '') => vm.$u.delete(`${add_carts_api}/${id}`)
	
	//订单预览及地址预览
	const getOrders = (params = {}) => vm.$u.get(orders_perview_api,params)
	
	//修改地址
	const modifyAddress = (id='',params={}) => vm.$u.put(`${upAddress_api}/${id}`,params)
	
	//获取地址
	const getAddress = ( ) => vm.$u.get(upAddress_api)
	
	//删除地址
	const delAddress = (id = '') => vm.$u.delete(`${upAddress_api}/${id}`)
	
	//新增地址
	const addAddress = (params = {}) => vm.$u.post(upAddress_api,params)
	
	//设为默认地址
	const setDefault = (id='') => vm.$u.patch(`/api/address/${id}/default`)
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {indexInfo,authLogin,userInfo,register,updateUserInfo,logout,authOssToken,updateAvatar,goodsInfo,collectGoods,
	addCarts,getCarts,getGoodsList,getCartsData,changeCartsGoodsNum,changeCartsChecked,removeCartsGoods,getOrders,modifyAddress,
	getAddress,delAddress,addAddress,setDefault};
}

export default {
	install
}