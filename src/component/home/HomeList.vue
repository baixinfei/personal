<template>
	<!--<ul class='home-list'>
		
		<li v-for="item in list">
			<img :src="handleImg(item.image_path)" />
		  	<div class="item-content">
		  		<h1>{{item.name}}</h1>
		  	</div>
		</li>
	</ul>-->
	<ul class="seller-list">
		<p class='tj'>推荐商家</p>
	  	<li class="seller-item one-bottom-px" v-for="item in list" @click="seller(item)">
		  	<img :src="handleImg(item.image_path)" />
		  	<div class="item-content">
		  		<h1>{{item.name}}</h1>
		  		<span class="star-item"></span>
		  		<p class='order'>
					<span class='rate'>
						<img src='/static/images/stat_03.jpg'/>
					</span>
					{{item.rating}}&nbsp;月售{{item.orderNum}}单</p>
		  		<p class='send'>￥{{item.float_minimum_order_amount}}起送&nbsp;|&nbsp;配送费￥{{item.float_delivery_fee}}</p>
		  		<p class='distance'>{{item.distance}}m&nbsp;|&nbsp;{{item.time}}分钟</p>
		  		<span class='icon'>票</span>
		  		<div class='discount' v-if="item.activity&&item.activity.length>0">
		  			<span class="showAll" @click.stop="showActivity(item)">{{item.activity.length}}个活动&nabla;</span>
		  			<p v-for="(active,index) in item.activity" v-if='index<2 || item.showActivity'>
		  				<span class='iconName' :style="{background:'#'+ active.icon_color}">{{active.icon_name}}</span>
		  				<span>{{active.tips}}</span>	
		  			</p>
		  		</div>
		  	</div>
		  	
  		</li>
	</ul>
</template>

<script>
	import Vuex from "vuex"
	import {restaurants} from '../../service/homeService.js'
	import {handleImg} from '../../common/common.js'
	export default{
		props:{
			list:Array
		},
		methods:{
			handleImg,
			showActivity(item){
				console.log(item);
				item.showActivity = !item.showActivity;
				this.$emit('update-scroll')
			},
			seller(item){
				this.$router.push('/home/detail/'+item.id);
				this.$emit('enter-subpage');
				
			}
		},
		updated(){
			this.$emit('refresh-scroll');
			
		}
//		data(){
//			return{
//				list:[],
//			}
//		},
//		computed:{
//			...Vuex.mapState(['latitude', 'longitude']),
//			itemclassify(){
//				let arr = [];
//				let score = Math.floor(result.)
//				
//			}
//		},
		
//		created(){
//			restaurants(this.latitude,this.longitude,this.list.length,this.limit).then((result)=>{
//				this.list = result;
//				var arr1 = result;
////				for(var i =0;i<arr1.length;i++){
////					var arr = [];
////					var score = arr1[i].rating
////					var hasDecimal = (score*10) % 10 !== 0;
////					var integer = Math.floor(score);
////					for(var s=0;s<integer;i++){
////						arr.push('on')
////					}
////					if(hasDecimal){
////						arr.push("half");
////					}
////					while(arr.length<5){
////						arr.push("off");
////					}
////					arr1[i].star = arr;
////				}
//				
//				//console.log(this.list);
//				
//				
//			})
//		}
		
	}
</script>

<style>
.seller-list{
	margin-top:15px;
background: #fff;
}
.seller-list .seller-item{
padding: 10px;
display: flex;
border-bottom: 1px solid #eee;

}
.tj{
	width:100%;
	padding-left:20px;
	line-height: 24px;
	font-weight: bold;
	
}
.seller-list .seller-item>img{
	width: 60px;
	height: 60px;
}
.seller-list .seller-item .item-content{
	margin-left: 10px;
	flex: 1;
	position: relative;
	color:#666;
	margin-top:5px;
}
.seller-list .seller-item .item-content h1{
	height: 26px;
	width: 130px;
	font-size: 14px;
	font-weight: bold;
	color: #333;
	line-height: 26px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	position: absolute;
	left:0;
	top:-10px;
}
.item-content .star-item{
	display: inline-block;
	width:20px;
	height:20px;
	margin-right:10px;
	background-size:cover ;
}
.star-item.on{
    background-image: url(/static/images/stat_03.jpg);
}
.star-item.half{
    background-image: url(/static/images/stat_05.jpg);
}
.star-item.off{
    background-image: url(/static/images/stat_07.jpg);
 }
.item-content .order{
	line-height:24px;
	position: absolute;
	top:15px;
	left:35px;
}
.item-content .send{
	line-height:24px;
	position: absolute;
	top:35px;
	left:0;
	
}
.item-content .distance{
	line-height:24px;
	position: absolute;
	top:35px;
	left:140px;
	
}
.item-content .icon{
	line-height:14px;
	position: absolute;
	top:-2px;
	right:10px;
	border:1px solid #ddd;
	
}
.item-content .discount{
	margin-top:40px;
	position: relative;	
}
.item-content .discount .showAll{
	position:absolute;
	top:0;
	right:5px;
}
.item-content .discount>p{
	width:80%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.item-content .discount>p>span{
	line-height:24px;
	margin:5px 0;
	width:100%;
	
	
}
.discount .iconName{
	border-radius: 3px;
	padding: 0 3px;
	color: #fff;
}
.rate{
	display: inline-block;
}
</style>