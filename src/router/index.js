import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

Vue.use(Router)

import Home from "../pages/home/home.vue"
import Address from "../pages/home/address.vue"
import Hotsearch from "../pages/home/hotsearch.vue"
import Searchlist from "../pages/home/searchlist.vue"
import sellerDetail from "../pages/home/detail.vue"


import Discover from "../pages/discover/discover.vue"
import Order from "../pages/order/order.vue"
import My from "../pages/my/my.vue"
import register from "../pages/my/register.vue"
import login from "../pages/my/login.vue"

export default new Router({
  routes: [
  	{
  		path:'/home',
  		component:Home,
  		children:[
  			{
  				path:'address',
  				component:Address
  			},
  			{
  				path:'hotsearch/:item',
  				component:Hotsearch
  			},
  			{
  				path:'searchlist',
  				component:Searchlist
  			},
  			{
  				path:'detail/:id',
				component:sellerDetail
				// beforeEnter: (to, from, next) => {
				// 	console.log(to,from)
				// }
  			}
  			
  		]
  	},
    {
    
  		path:'/discover',
  		component:Discover
  	},
    {
    	
  		path:'/order',
  		component:Order
  	},
    {
    	
  		path:'/my',
  		component:My,
  		children:[
  			{
  				path:'register',
  				component:register
  			},
  			{
  				path:'login',
  				component:login
  			}
  		]
  	},
    {
  		path:'/',
  		redirect:'/home'
  	},
  	{
  		path:'*',
  		redirect:'/home'
  	}
   
   	
    	
    	
  ]
})
