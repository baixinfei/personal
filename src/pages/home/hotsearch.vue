<template>
	<transition enter-active-class="slideInRight"
		:leave-active-class="leaveClass">
		<div id='hotsearch' class='pages'>
			<header>
				<span @click="backAction()">&lt;</span>
				<input type='text' placeholder="请输入商品名称" v-model="val"/>
				<em >搜索</em>
			</header>
			<nav>
				<li>发现</li>
				<li>排序</li>
				<li>筛选</li>
			</nav>
			<div class="wrapper">
				<ul class='store'>
					<li v-for="item in listData">
						<img :src='handleImg(item.image_path)' />
						<div class='storeInfo'>
							<p class='name'>{{item.name}}</p>
							<p>{{item.rating}}月销{{item.orderNum}}单</p>
							<p>
								<span>￥{{item.sendFree}}起送&nbsp;|&nbsp;配送费{{item.free}}</span>
								<i v-if='item.distance>=1000'>{{Math.ceil(item.distance/10)/100}}km&nbsp;|&nbsp;{{item.time}}分钟</i>
								<i v-else-if="item.distance<1000">{{item.distance}}km&nbsp;|&nbsp;{{item.time}}分钟</i>
							</p>
							<em v-if="item.send">{{item.send.text}}</em>
							<b v-if="item.support[0]">{{item.support[0].icon_name}}</b>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>
<script>
	import Vuex from 'vuex'
	import {getSearchSeller} from "../../service/homeService.js"
	import {handleImg} from '../../common/common.js'
	export default{
		props:['keyword'],
		data(){
			return{
				// val:this.$route.params.item,
				val:this.keyword,
				listData:[],
				leaveClass: '',
			}
		},
		computed: {
			...Vuex.mapState(['latitude', 'longitude'])
		},
		methods:{
			handleImg,
			backAction(){
				this.leaveClass = 'slideOutRight';
				console.log(this.$route);
				this.$router.replace("/home");
				// if(this.$route.path == '/home/searchlist'){
				// //判断是否从搜索进入
				// 	this.$emit('close');
				// }
				// else{
				// 	//判断是否从首页进入
				// 	this.$router.back();
				// }
			}
		},
		created(){
			console.log(this.keyword);
			if(this.$route.params.item){
				this.val = this.$route.params.item;
			}
			getSearchSeller(this.val, this.latitude, this.longitude)
			.then((result)=>{
				this.listData = result;
				//console.log(result)
				
			})
		},
		mounted(){
			var navScroll =  new IScroll('#hotsearch .wrapper ',{
				click: true,
				tap: true,
				bounce: false,
				probeType: 3
			})
			navScroll.on('scrollStart', ()=>{
				navScroll.refresh();
			})
		}
		
	}
</script>

<style>
	#hotsearch{
		background: #fff;
		bottom:0;
		z-index:20;
		overflow: auto;
	}
	#hotsearch .wrapper{
		position: absolute;
		top: 80px;
		/*overflow: hidden;*/
		height: 100%;
		width: 100%;
		left:0;
		overflow: hidden;
	}
	#hotsearch header{
		width:100%;
		height:40px;
		padding: 0 10px;
		line-height:40px;
		position:absolute;
		top:0;
		left:0;
		
	}
	#hotsearch header span{
		font-size:18px;
		color:#333;
		margin-right:20px;
		cursor: pointer;
	}
	#hotsearch header input{
		width:70%;
		height:30px;
		border:none;
		background: #f8f8f8;
		color:#666;
		padding-left: 20px;
		margin-right:20px;
	}
	#hotsearch nav{
		width:100%;
		height:40px;
		line-height: 40px;
		display: flex;
		position:absolute;
		top:40px;
		left:0;
		
	}
	#hotsearch nav li{
		flex:1;
		color:#666;
		text-align: center;
		border-bottom: 1px solid #ddd;
	}
	#hotsearch .store{
		width:100%;
		padding:0 10px;
		position:relative;
	}
	
	#hotsearch .store li{
		width:100%;
		padding-bottom: 10px;
		border-bottom: 1px solid #eee;
		display: flex;
		margin-top:10px;
	}
	#hotsearch .store li img{
		width:60px;
		height:60px;
		margin-right: 10px;
	}
	#hotsearch .store li .storeInfo{
		flex:1;
		border-bottom: 1px solid #eee;
		position:relative;
	}
	#hotsearch .store li .storeInfo p{
		line-height: 20px;
	}
	#hotsearch .store li .storeInfo p.name{
		width:150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 20px;
	}
	#hotsearch .store li .storeInfo p>span{
		display: inline-block;
		margin-bottom: 5px;
	}
	#hotsearch .store li .storeInfo p>i{
		display: block;
		position:absolute;
		right:0;
		top:40px;
		margin-bottom: 5px;
	}
	#hotsearch .store li .storeInfo em{
		line-height:16px;
		color:#fff;
		background: #0096FF;
		position: absolute;
		top:25px;
		right:10px;
	}
	#hotsearch .store li .storeInfo b{
		display: block;
		line-height: 12px;
		color:#999;
		border:1px solid #666;
		position: absolute;
		top:5px;
		right:10px;
	}
</style>