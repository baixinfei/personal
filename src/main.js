import Vue from 'vue'
import App from './App'//根组件
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$event = new Vue();
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  store,
  components: { 
  	App: App
  },
  template: '<App/>'
})

