<template>
	<div id='discoverSale'>
		<h1>{{list.page_title}}</h1>
		<p>特价商品,一网打尽</p>
		<ul>
			<li v-for="(item,index) in list.query_list " v-if='index<3'>
				<img :src='handleImg(item.foods[0].image_path)' />
				<p>{{item.foods[0].name}}</p>
				<span>
					￥{{item.foods[0].price}}
					<s>{{item.foods[0].original_price}}</s>
				</span>
				<i>{{item.foods[0].discount_rate*10}}折</i>
				
			</li>
		</ul>
		<p>查看更多&gt;</p>
	</div>
</template>

<script>
	import Vuex from 'vuex'
	import {getsale} from '../../service/discoverService.js'
	import {handleImg} from '../../common/common.js'
	export default{
		data(){
			return{
				list:{}
			}
		},
		computed: {
			...Vuex.mapState(['latitude', 'longitude'])
		},
		methods:{
			handleImg
		},
		created(){
			getsale(this.latitude,this.longitude)
			.then((result)=>{
				console.log(result);
				this.list = result
			})
		}
	}
</script>

<style>
	#discoverSale{
		width:100%;
		margin-bottom:10px;
		background: #fff;
		overflow: hidden;
		padding: 10px;
		
	}
	#discoverSale h1{
		font-size:16px;
		text-align: center;
		margin-top:10px;
		
	}
	#discoverSale>p{
		text-align: center;
		line-height: 16px;
		color:#666;
		
	}
	#discoverSale ul{
		width:100%;
		margin-top:10px;	
	}
	#discoverSale ul>li{
		width:33%;
		height:160px;
		position: relative;
		display: inline-block;
		padding-left:5px ;
		
	}
	#discoverSale ul>li>img{
		width:100%;
		height:100px;
	}
	#discoverSale ul>li>p{
		line-height:24px;
		width:100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	#discoverSale ul>li>span{
		line-height:24px;
		color:red;
	}
	#discoverSale ul>li>span s{	
		color:#ddd;
	}
	#discoverSale ul>li>i{
		position:absolute;
		left:5px;
		top:0;
		line-height:12px;
		padding: 5px;
		background: #333;
		color:#fff
	}
</style>