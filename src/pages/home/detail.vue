<template>
	<div id='seller-detail' class='pages'>
		<header >
			<span @click="$router.back()">&lt;</span>
			<div class='sellerinfo'>
				<img :src='handleImg(seller.image_path)' />
				<div class='other'>
					<p class='name'>{{seller.name}}</p>
					<p>商家配送/{{seller.order_lead_time}}分钟送达/配送费￥{{seller.float_delivery_fee}}</p>
					<p class='notice'>公告：{{seller.promotion_info}}</p>
				</div>
			</div>
			<div class='sellerAd' v-if="seller.activities&&seller.activities.length>0">
		  			<p v-for="(active,index) in seller.activities" v-if='index<1 || seller.showActivity'>
		  				<span class='iconName' :style="{background:'#'+ active.icon_color}">{{active.icon_name}}</span>
		  				<span>{{active.tips}}</span>	
		  			</p>
		  			<span class="showAll" @click="getmore()">{{seller.activities.length}}个活动&nabla;</span>
		  		</div>
		</header>
		<ul class='nav' v-if='tabList.length>0'>
			<li v-for='item in tabList'  @click="changeActive(item)" :class="{active:selectClass==item}">
				<span >{{item}}</span>
			</li>
		</ul>
		<detail-goods :sellerId="sellerId" v-show='selectClass=="商品"'></detail-goods>
		<detail-rating v-show='selectClass=="评价"' :sellerId='sellerId'></detail-rating>
		<detail-info v-show='selectClass=="店铺"' :sellerId='sellerId'></detail-info>
		<detail-cart :sellerId='seller' :selllerad = 'selllerad'></detail-cart>
		<transition enter-active-class="slideInRight"
			leave-active-class="slideOutRight">
			<detail-cover v-if='flag' :sellerad='seller' @changeAction='changeFlag' ></detail-cover>
		</transition>
	</div>
</template>

<script>
	import DetailGoods from '../../component/home/detailGoods.vue'
	import DetailRating from '../../component/home/detailRating.vue'
	import DetailInfo from '../../component/home/detailInfo.vue'
	import DetailCart from '../../component/home/detailCart.vue'
	import DetailCover from '../../component/home/detailCover.vue'
	import Vuex from 'vuex'
	import {getSellerInfo} from "../../service/homeService.js"
	import {handleImg} from '../../common/common.js'
	
	export default{
		data(){
			//var arr = JSON.parse(sessionStorage.getItem('sellerInfo'))
			return{
				tabList:['商品','评价','店铺'],
				selectClass:'商品',
				sellerId: this.$route.params.id,
				seller:[],
				flag:false,
				selllerad:''
				
			}
		},
		computed:{
			...Vuex.mapState(['latitude', 'longitude']),
		},
		components:{
			'detail-goods':DetailGoods,
			'detail-rating':DetailRating,
			'detail-info':DetailInfo,
			'detail-cart':DetailCart,
			'detail-cover':DetailCover,
			
		},
		methods:{
			handleImg,
			changeActive(item){
				this.selectClass = item;
			},
			showActivity(item){
				item.showActivity = !item.showActivity;
			},
			getmore(){
				this.flag = true;
			},
			changeFlag(s){
				//console.log(s)
				this.flag = s;
			}
		},
		created(){
			getSellerInfo(this.sellerId,this.latitude,this.longitude)
			.then((result)=>{
				console.log(result);
				this.seller = result;
				if(result.activities.length>0){
					var str;
					for(var i=0;i<result.activities.length;i++){
						if(result.activities[i].icon_name == '减'){
							var str = result.activities[i].description
						}
						
					}
					console.log(str);
					this.selllerad  = str;
//					var str =result.activities.map((item)=>{
//						if(item.){
//							return item.description;
//						}
//					})
//					console.log(str);
				}
			})
		},
		// beforeRouteEnter:(to,from,next)=>{
		// 	console.log(to);
		// 	next();
		// 	// next((vm)=>{
		// 	// 	console.log(vm.flag);
		// 	// 	vm.changeActive();
		// 	// })
		// },
	}
</script>

<style>
	#seller-detail{
		bottom:0;
		background: #fff;
		z-index:20;
	}
	#seller-detail header{
		width:100%;
		height:130px;
		background:#666666;
		overflow: hidden;
	}
	#seller-detail header>span{
		display: block;
		height:20px;
		font-size:20px;
		line-height:20px;
		padding-left: 20px;
		color:#fff;
		margin-top:2px;
	}
	.sellerinfo{
		width:100%;
		height:60px;
		padding: 0 10px;
		display: flex;
		margin-top:5px;
		color:#fff;
	}
	.sellerinfo img{
		width:60px;
		height:60px;
		
	}
	.sellerinfo .other{
		flex:1;
		padding: 0 8px;
		font-size:12px;
		
	}
	.other>p{
		width:230px;
		line-height:22px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;	
	}
	.other .name{
		font-weight: bold;
		font-size:16px;
	}
	 .sellerAd{
		margin-top:10px;
		position: relative;	
		
	}
	 .sellerAd .showAll{
		position:absolute;
		top:0;
		right:5px;
		color:#fff;
		line-height:24px;
	}
	.sellerAd>p{
		width:80%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		padding-left: 10px;
		color:#fff;
	}
	.sellerAd>p>span{
		line-height:24px;
		margin:5px 0;
		width:100%;
		
		
		
	}
	.sellerAd .iconName{
		border-radius: 3px;
		padding: 0 3px;
		color: #fff;
	}
	.nav{
		display:flex;
		width:100%;
		height:40px;
		background: #fff;
		color:#666;
		border-bottom: 1px solid #eee;
	}
	.nav li{
		flex:1;
		text-align:center;
	}
	.nav li>span{
		line-height:40px;
		font-size:14px;
		
	}
	.nav li.active span{
		border-bottom:2px solid #0089DC;
	}
	#seller-detail .slide{
		position:absolute;
		top:170px;
		left:0;
		bottom:0;
		width:100%;
	}
</style>