<template>
	
	<div id='discover' class='pages'>
		<header class='nav-bar'>
			<span>&lt;</span>
			<h1 class="title">发现</h1>
		</header>
		<div class='wrapper'>
			<div class='wraperMeau'>
				<div class='banner'>
					<a href="#" v-for="item in bannerList">
						<p>
							<span :style="{color: item.title_color}">{{item.title}}</span>
							<i>{{item.subtitle}}</i>
						</p>
						<img :src='handleImg(item.main_pic_hash)' />
					</a>
				</div>
				<div class='discoverAd'>
					<img :src="handleImg(path)"/>
				</div>
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
							<i>{{Math.floor(item.foods[0].discount_rate*100)/10}}折</i>
							
						</li>
					</ul>
					<p>查看更多&gt;</p>
				</div>
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
							<i>{{Math.floor(item.foods[0].discount_rate*100)/10}}折</i>
							
						</li>
					</ul>
					<p>查看更多&gt;</p>
				</div>
				<div id='discoverSale'>
					<h1>限时好礼</h1>
					<p>金币换豪礼</p>
					<ul>
						<li v-for="(item,index) in timeLimit " v-if='index<3'>
							<img :src='handleImg(item.image_hash)' />
							<p>{{item.title}}</p>
							<span>
								{{item.points_required}}金币
								<s>￥{{item.original_price}}</s>
							</span>
							<i>{{item.corner_marker}}</i>
							
						</li>
					</ul>
					<p>查看更多&gt;</p>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import Vuex from 'vuex'
	import {getclassfify,getsale,getTimeList} from '../../service/discoverService.js'
	import {handleImg} from '../../common/common.js'
	import discoverSale from '../../component/discover/discoverSale.vue'
	export default{
		data(){
			return{
				bannerList:[],
				list:{},
				path:'/b/6d/656006edcd86033a1b32b23ddea37jpeg',
				timeLimit:[]
			}
		},
		computed: {
			...Vuex.mapState(['latitude', 'longitude'])
		},
		methods:{
			handleImg
		},
		created(){
			getclassfify(this.latitude,this.longitude)
			.then((result)=>{
				this.bannerList = result[1]
			});
			getsale(this.latitude,this.longitude)
			.then((result)=>{
				this.list = result
			});
			getTimeList().then((result)=>{
				console.log(result);
				this.timeLimit = result;
			})
		},
		mounted(){
			var discoverScroll = new IScroll('#discover .wrapper',{
				click: true,
				tap: true,
				bounce: false,
				probeType: 3
			})
			discoverScroll.on('scrollStart', ()=>{
				discoverScroll.refresh();
			})
		}
	}
</script>

<style>
	
	#discover{
		background: #F5F5F5;
		overflow: auto;
	}
	#discover .nav-bar{
		position: relative;
	}
	#discover .nav-bar span{
		line-height:40px;
		font-size:30px;
		position: absolute;
		top:0;
		left:0;
		padding-left: 10px;
	}
	#discover .wrapper{
		width:100%;
		height:100%;
		position: absolute;
		top:40px;
		left:0;
		overflow: hidden;
	}
	#discover .banner{
		width:100%;
		background: #fff;
	}
	.banner a{
		display: inline-block;
		width:50%;
		padding: 20px 10px;
		position: relative;
		border-bottom:1px solid #eee;
		border-right:1px solid #eee;
		position: relative;
	}
	.banner a:nth-child(2){
		border-right: none;
	}
	.banner a:nth-child(4){
		border-right: none;
	}
	.banner a>p{
		display: inline-block;
	}
	.banner a>p>span{
		display: block;
		line-height:24px;
		font-size:14px;
	}
	.banner a>p>i{
		display: block;
		line-height:24px;
		color:#999;
	}
	.banner a>img{
		width:50px;
		height:50px;
		position: absolute;
		right:10px;
		top:20px;
	}
	.discoverAd{
		width:100%;
		height:70px;
		margin:10px 0;
	}
	.discoverAd img{
		width:100%;
		height:70px;
	}
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