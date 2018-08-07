import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	latitude:22.54286,
	longitude:114.059563,
	"templates[]":"main_template",
	order:[],
	seller:{}
	
}
const mutations = {
	modifyAddress(st, param){
		st.latitude = param.lat;
		st.longitude = param.lon;
	},
	addOrder(st,param){
		st.order .push(param);
//		console.log(param);
//		console.log(st.order);
	}
	
	
}
import Ordermodel from './order.js'
export default new Vuex.Store({
	state,
	mutations
})
