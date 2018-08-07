<template>
<header class="home-header">
  <div class="info">
  	<span class="address" @click="addressAction()">{{address}}</span>
  	<div class="weather">
  		<span>{{weather.temperature}}°</span>
  		<span>{{weather.description}}</span>
  		
  		<img v-if="weather.image_hash" :src="handleImg(weather.image_hash)" />
  	</div>
  </div>
  <div class='search' @click="searchAction()">
		<span class="search-box">搜索商家、商品名称</span>
		<span class='mirror'></span>
	</div>
  <div class="hot-words">
  	<span v-for="item in hotword" @click="hotwordAction(item)">{{item}}</span>
  </div>
</header>	
</template>

<script>
	import Vuex from 'vuex'
	import {getAddress,getWeather,getHotWord} from '../../service/homeService.js'
	import {handleImg} from '../../common/common.js'
export default{
	data(){
		return {
			address:'',
			weather:{},
			hotword:[]
		}
	},
	computed:{
		...Vuex.mapState(['latitude', 'longitude'])
	},
	methods:{
		handleImg,
		addressAction(){
			this.$router.push('/home/address');
		},
		searchAction(){
			this.$router.push('/home/searchlist')
			
		},
		hotwordAction(item){
			this.$router.push('/home/hotsearch/'+item)
			
		},
		requestData(){
			getAddress(this.latitude,this.longitude).then((result)=>{
			
			this.address = result;
			})
			getWeather(this.latitude,this.longitude).then((result)=>{
				
				this.weather = result;
			})
			getHotWord(this.latitude,this.longitude).then((result)=>{
				
				this.hotword = result;
			})
		}
	},
	created(){
		//请求地址
		//初始化数据
		this.requestData();
		
		//监听下拉刷新
		this.$event.$on('update-data', ()=>{
			this.requestData();
		})
		//监听地址的变化
		this.$event.$on('update-address', (result)=>{
			this.address = result;
		})

		
		
	}
}
</script>

<style>
.home-header{
	width: 100%;
	height: 106px;
	background: #0085ff;
}
.info{
	width: 100%;
	height: 44px;
	position: relative;
}
.info .address{
	position: absolute;
	top: 10px;
	left: 20px;
	height: 30px;
	font-size: 14px;
	font-weight: bold;
	color: #fff;
	line-height: 30px;
	width:150px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	display: block;
}
.info .weather{
	position: absolute;
	top: 10px;
	right: 10px;
	height: 30px;
	font-weight: bold;
	color: #fff;
}
.info .weather span{
	width:50px;
	position:absolute;
	right:35px;
	top:-1px;
	text-align: center;
}
.info .weather span:last-of-type{
	position:absolute;
	right:35px;
	top:15px;
}
.info .weather img{
	width:30px;
	height:30px;
	position:absolute;
	right:4px;
	top:3px;
}
.search{
	box-sizing: border-box;
	width: 100%;
	height: 36px;
	padding: 4px 14px;
	position: relative;
}
.search .search-box{
	display: block;
	width: 100%;
	height: 100%;
	text-align: center;
	line-height: 28px;
	color: #666;
	font-size: 12px;
	font-weight: bold;
	background: #fff;
}
.search .mirror{
width:17px;
height:19px;
position:absolute;
left:25%;
top:11px;
background: url(/static/images/mirror_03.jpg) no-repeat;
background-size:cover;
}
/*.search{
	box-sizing: border-box;
	width: 100%;
	height: 36px;
	padding: 4px 14px;
}
.search .search-box{
	display: block;
	width: 100%;
	height: 100%;
	text-align: center;
	line-height: 28px;
	color: #666;
	font-size: 12px;
	font-weight: bold;
	background: #fff;
}*/
.hot-words{
	width: 100%;
	height: 30px;
	background: #0085ff;
	padding:0 10px;
	overflow-x: auto;
	white-space: nowrap;	
}
.hot-words span{
	line-height:30px;
	color:#fff;
	margin-right:15px;
}
</style>