<template>
	<div class='slide' id='detailInfo'>
		<div class='wrapper01'>
		<div >
			<div class='activity' >
				<h4>活动与服务</h4>
				<p  v-if='sellerAllInfo[0].activities.length>0' v-for="(active,index) in sellerAllInfo[0].activities" >
					<span class='iconName' :style="{background:'#'+ active.icon_color}">{{active.icon_name}}</span>
					<span>{{active.tips}}</span>	
				</p>
			</div>
			<div class='photo'>
				<h4>商家实景</h4>
				<ul>
					<li v-for='item in sellerAllInfo[0].albums'>
						<img :src='handleImg(item.cover_image_hash)' />
						<p>{{item.name}}({{item.count}}张)</p>
					</li>
				</ul>
			</div>
			<div class='sellerInfo'>
				<b>
					<p>商家信息</p>
					<p>{{sellerAllInfo[0].description}}</p>
				</b>
				<p>
					<span>商家电话</span>
					<em>{{sellerAllInfo[0].phone.substring(0,14)}}></em>
				</p>
				<p>
					<span>地址</span>
					<em>{{sellerAllInfo[0].address}}</em>
				</p>
				<p class='time'>
					<span>营业时间</span>
					<em>{{sellerAllInfo[0].opening_hours[0]}}</em>
				</p>
			</div>
			<div class='qualification'>
				<!--<a :href="{{sellerAllInfo[0].qualification.link}}">营业资质</a>-->
				<p>营业资质</p>
				<span>></span>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	// import Vuex from 'vuex'
	// import {getSellerInfo} from "../../service/homeService.js"
	import Vuex from 'vuex'
	import {getSellerInfo} from "../../service/homeService.js"
	import {handleImg} from '../../common/common.js'
	let sellerScroll
	export default{
		data(){
			return{
				sellerAllInfo:[]
			}
		},
		props:["sellerId"],
		computed:{
			...Vuex.mapState(['latitude','longitude'])
		},
		methods:{
			handleImg
		},
		created(){
			console.log(this.sellerId);
			console.log(this.longitude,this.latitude);
			getSellerInfo(this.sellerId,this.latitude,this.longitude)
			.then((result)=>{
				this.sellerAllInfo.push(result);
			})
		},
		updated(){
			sellerScroll = new IScroll('#detailInfo .wrapper01', {
				probeType: 3
			});
			sellerScroll.on('scrollStart', ()=>{
				sellerScroll.refresh();
			})
		}
	}
</script>

<style>
	#detailInfo{
		background: #f5f5f5;
		overflow: auto;
		z-index:50;
	}
	.wrapper01{
		overflow: hidden;
	}
	.activity{
		width:100%;
		padding: 5px 10px ;
		background: #fff;	
	}
	.activity>h4{
		line-height:20px;
		font-size:14px;
	}
	.activity>p{
		line-height:20px;
	}
	.activity>p>span{
		line-height:20px;
		margin:5px;
	}
	.photo{
		width:100%;
		margin-top:10px;
		background: #fff;
		padding: 5px 10px ;
	}
	.photo h4{
		line-height:20px;
		font-size:14px;
	}
	.photo>ul{
		
	}
	.photo>ul li{
		display: inline-block;
		margin-right:10px;
		position: relative;
	}
	.photo>ul li>img{
		width:70px;
		height:70px;
	}
	.photo>ul li>p{
		width:100%;
		text-align: center;
		position:absolute;
		left:0;
		bottom:0;
		line-height:20px;
		color:#fff;
		
	}
	.sellerInfo{
		width:100%;
		padding: 5px 10px ;
		background: #fff;	
		margin-top:10px;
	}
	.sellerInfo b{
		display: block;
		border-bottom:1px solid #eee;
	}
	.sellerInfo p.time{
		border:none;
	}
	.sellerInfo b>p{
		line-height:40px;
	}
	.sellerInfo>p{
		width:100%;
		line-height:30px;
		border-bottom:1px solid #eee;
		position: relative;
		height:40px;
		line-height: 40px;
	}
	.sellerInfo p span{
		position: absolute;
		left:0;
		top:0;
	}
	.sellerInfo p em{
		position: absolute;
		right:0;
		top:0;
		width:75%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: right;
	}
	.qualification{
		width:100%;
		height:40px;
		line-height:40px;
		padding: 5px 10px ;
		background: #fff;	
		position: relative;
		margin-top:10px;
	}
	.qualification>P{
		position: absolute;
		left:10px;
		top:0;
	}
	.qualification>span{
		position: absolute;
		right:10px;
		top:0;
	}
</style>