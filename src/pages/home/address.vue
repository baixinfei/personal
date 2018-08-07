<template>
	<div id='address' class='pages'>
		<header>
			<span @click="$router.back()">&lt;</span>
			选择收货地址
		</header>
		<div class='wrapper'>
			<div class='search-addresss'>
				<input type='search' placeholder="请输入地址" v-model='val' />
				<span class='mirror' @click="searchNearchby()"></span>
			</div>
			<p>当前地址</p>
			<p class='newposition'>
				<span>深圳市福田市民中心</span>
				<em>重定位</em>
			</p>
			<ul class='address-list' v-show="show">
				<li v-for="item in arr" @click="choice(item)">
					<span >{{item.name}}</span>
					<span>{{item.address}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Vuex from 'vuex'
	import {nearby} from '../../service/homeService.js'
	let Timer = null;
	export default {
		data(){
			return{
				val:'',
				arr:[],
				show:false
			}
		},
		watch:{
			$route( to , from ){     
              console.log( to , from )
         	}
		},
		computed:{
			...Vuex.mapState(['longitude','latitude'])
		},
		methods:{
			searchNearchby(){
				
				this.show = true;
				nearby(this.latitude,this.longitude,this.val).then((result)=>{
					this.arr = result;
				})
			},
			choice(item){
				//更新首页头部的地址
				this.$event.$emit('update-address', item);
				
				this.$store.commit('modifyAddress', {
					lat: item.lat,
					lon: item.lon
				});

				this.$event.$emit('update-data');
				this.$router.back();
			}
		},
		created(){
			console.log("进入")
			this.$watch('$route', ()=>{
				console.log("改变了")
				// clearTimeout(Timer);
				// //请求
				// Timer = setTimeout(()=>{
				// 	this.searchNearchby();
				// }, 1000);
			})

		}
	}
</script>

<style>
	#address{
		width:100%;
		position: absolute;
		left:0;
		top:0;
		bottom:0;
		z-index:20;
		background: #f4f4f4;
	}
	#address>header{
		width:100%;
		height:44px;
		line-height:44px;
		text-align: center;
		color:#fff;
		background: #0085ff;
		position: relative;
		font-size:16px;
	}
	#address header>span{
		font-size:20px;
		position:absolute;
		left:15px;
		top:0px;
	}
	.search-addresss{
		width:100%;
		height:50px;
		text-align: center;
		line-height: 50px;
		background: #fff;	
		position: relative;
	}
	.search-addresss input{
		width:85%;
		height:30px;
		background: #f2f2f2;
		border:none;
		padding-left: 30px;
	}
	.search-addresss .mirror{
		width:17px;
		height:19px;
		position:absolute;
		left:9%;
		top:15px;
		background: url(/static/images/mirror_03.jpg) no-repeat;
		background-size:cover;
	}
	#address p{
		width:100%;
		line-height:30px;
		background:#f2f2f2;
		padding-left: 15px;
	}
	 #address .newposition{
		width:100%;
		height:30px;
		background: #fff;
		position:relative;
	}
	.newposition>span{
		font-size:14px;
		line-height: 30px;
		font-weight: bold;
		position: absolute;
		left:15px;
		top:0;
	}
	.newposition>em{
		color: #2395ff;
		line-height: 30px;
		position: absolute;
		right:33px;
		top:0;
	}
	#address .address-list{
		width:100%;
		background: #fff;
		position: absolute;
		left:0;
		top:95px;
	}
	.address-list>li{
		width:100%;
		padding:5px 10px;
		border-bottom: 1px solid #ddd;
	}
	.address-list>li>span{
		display: block;
		line-height: 20px;
	}
</style>