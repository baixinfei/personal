<template>
	<transition enter-active-class="fadeInRight"
		leave-active-class="fadeOutRight">
		<div id='searchlist' class='pages'>
			<header>
				<span @click="$router.back()">&lt;</span>
				<input type='text' placeholder="请输入商品名称" v-model="val"/>
				<em @click="searchAction2()">搜索</em>
			</header>
			<p>热门搜索</p>
			<div class='keyword'>
				<span v-for="item in list" @click="keywordAction(item)">{{item}}</span>
			</div>
			<search-list v-if="showlist" @close="closeSearchList()" :keyword='val'></search-list>
		</div>
	</transition>
</template>

<script>
	import Vuex from 'vuex'
	import {getsearchWord} from '../../service/homeService.js'
	import SearchList from './hotsearch.vue'
	export default{
		data(){
			return{
				geohash:"ws105rz9smwm",
				timestamp:1507607155,
				locationName:"%E7%A6%8F%E7%94%B0%E5%8C%BA%E6%B7%B1%E5%9C%B3%E5%B8%82%E6%B0%91%E4%B8%AD%E5%BF%83",
				list:[],
				val:'',
				showlist: false

			}
		},
		computed:{
			...Vuex.mapState(['latitude', 'longitude'])
		},
		components: {
			'search-list': SearchList
		},
		methods:{
			keywordAction(item){
				this.val = item;
			},
			searchAction2(){
				console.log(this.val);
				this.showlist = true
			},
			closeSearchList(){
				this.showlist = false	
			}
		},
		created(){
			getsearchWord(this.latitude,this.longitude,this.geohash,this.timestamp,this.locationName).then((result)=>{
				//console.log(result);
				this.list = result
			})
		}
		
	}
</script>

<style>
	#searchlist{
		background: #fff;
		bottom:0;
		z-index:20;
	}
	#searchlist header{
		width:100%;
		height:40px;
		padding: 0 10px;
		line-height:40px;
	}
	#searchlist header span{
		font-size:18px;
		color:#333;
		margin-right:20px;
		cursor: pointer;
	}
	#searchlist header input{
		width:70%;
		height:30px;
		border:none;
		background: #f8f8f8;
		color:#666;
		padding-left: 20px;
		margin-right:20px;
	}
	#searchlist>p{
		font-size:14px;
		font-weight: bold;
		color:#666666;
		margin-left:20px;
		margin-top:20px;
	}
	.keyword{
		width:100%;
		padding:0 10px;
	}
	.keyword span{
		display: inline-block;
		line-height:20px;
		margin-left:20px;
		background: #f7f7f7;
		color:#666;
		padding: 5px;
		margin-top:10px;
	}
</style>