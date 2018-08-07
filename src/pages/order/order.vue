<template>
	<div id='cart' class='pages'>
		<header class='nav-bar'>
			<span>&lt;</span>
			<h1 class="title">订单</h1>
		</header>
		<div class='seller'>
			<li v-for="item in order">
				<p>{{item.name}}</p>
				<p>{{item.num}}</p>
				<p>{{item.specfoods[0].price}}</p>
				<p></p>
			</li>
		</div>
	</div>
</template>

<script>
	import Vuex from 'vuex'
	import { handleImg } from '../../common/common.js'
	import { confirm } from '../../service/discoverService.js'
	export default{
		computed:{
			...Vuex.mapState(['order'])
		},
		methods:{
			handleImg
		},
		created(){
			confirm().then((result)=>{
				console.log(result);
			}),
			this.order.map((item)=>{
				console.log(item);
			})
//			this.$event.$on('sellerinfo',(res)=>{
//				console.log(res);
//			})
			
			
		}
	}
</script>

<style>
	#cart{
		background: #F5F5F5;
	}
	#cart .nav-bar{
		position: relative;
	}
	#cart .nav-bar span{
		line-height:40px;
		font-size:30px;
		position: absolute;
		top:0;
		left:0;
		padding-left: 10px;
	}
	#cart .seller{
		width:100%;
		margin-top:10px;
		padding-left:10px ;
		
	}
</style>