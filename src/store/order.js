import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	order:[]
	
}
const mutations = {
	addOrder(st, param){
		st.order.push(param)
		console.log(param)
	}
}

export default new Vuex.Store({
	namespaced:true,
	state,
	mutations
})