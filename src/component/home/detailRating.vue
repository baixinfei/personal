<template>
	<div class='slide' id='seller_rating'>
		<div class='allInfo'>
			<div class="left">
				<h4>{{Math.floor(allRating.overall_score*10)/10}}</h4>
				<p>综合评价</p>
				<p>高于周边商家{{Math.ceil(allRating.compare_rating*100)/10}}%</p>
			</div>
			<div class='right'>
				<p>
					<span>服务态度</span>
					<em>{{Math.round(allRating.service_score*10)/10}}</em>
				</p>
				<p>
					<span>菜品评价</span>
					<em>{{Math.round(allRating.overall_score*10)/10}}</em>
				</p>
				<p>
					<span>送达时间</span>
					<i>{{allRating.deliver_time}}分钟</i>
				</p>
			</div>
		</div>
		<nav>
			<span v-for ='item1 in ratingClassfify' 
				:class="{choice: item1.unsatisfied==false,no_choice: item1.unsatisfied==true,active:index==1}"
				@click="clickrating()"
				>
				{{item1.name}}({{item1.count}})
			</span>	
		</nav>
		<div class='allRating'>
			<li v-for='item in ratingList'>
				<img :src="handleImg(path)" />
				<div class='content'>
					<p class='username'>
						<i>{{item.username}}</i>
						<em>{{item.rated_at}}</em>
					</p>
					<p class='star'>{{item.rating_star}}</p>
					<p class='food_name'>
						<span v-for="i in item.item_ratings" >{{i.food_name}}</span>
					</p>
				</div>
				
			</li>
		</div>
		
	</div>
</template>

<script>
	import {getSellerRating,getAllRating,getRatingClassfify} from "../../service/homeService.js"
	import {handleImg} from '../../common/common.js'
	export default{
		data(){
			return{
				ratingList:[],
				path:'/c/f5/d0b0f2fc83f3ac3e4a0cfae891256png',
				allRating:{},
				ratingClassfify:[],
				index:0
			}
		},
		props:["sellerId"],
		methods:{
			handleImg,
			clickrating(){
				this.index = 1;
				this.index = 0;
				
			}
		},
		created(){
			getSellerRating(this.sellerId)
			.then((result)=>{
				this.ratingList=result;
			});
			getAllRating(this.sellerId)
			.then((result)=>{
				this.allRating = result;
			});
			getRatingClassfify(this.sellerId)
			.then((res)=>{
				this.ratingClassfify = res;
			})
		}
	}
</script>

<style>
	#seller_rating{
		background: #f5f5f5;
		overflow: auto;
		z-index:50;
	}
	.allInfo{
		width:100%;
		padding: 10px;
		display: flex;
		background: #fff;
	}
	.allInfo .left{
		width:120px;
		border-right:1px solid #ddd;
		text-align: center;
	}
	.allInfo .left h4{
		font-size:20px;
		color:red;
		
	}
	.allInfo .left p{
		color: #666;
	}
	.allInfo .right{
		flex:1;
		padding-left: 20px;
	}
	.allInfo .right p{
		line-height:20px;
	}
	.allInfo .right p span{
		margin-right:10px;
	}
	.allInfo .right p em{
		color:red;
	}
	#seller_rating nav{
		width:100%;
		padding:10px;
		background: #fff;
		border-bottom: 1px solid #ddd;
		margin-top:10px;
	}
	#seller_rating nav>span{
		display: inline-block;
		text-align: center;
		line-height:20px;
		padding: 5px;
		margin-right:5px;
		margin-top:5px;
	}
	#seller_rating nav>span.choice{
		background:#ebf5ff;
		color:#6d7885;
	}
	#seller_rating nav>span.no_choice{
		background:#f5f5f5;
		color:#aaa;
	}
	#seller_rating nav>span.active{
		background:#0097ff;
		color:#fff;	
	}
	.allRating{
		width:100%;
		padding: 0 10px;
		background: #fff;
	}
	.allRating>li{
		border-bottom:1px solid #ddd;
		padding: 10px 0;
		display: flex;
	}
	.allRating>li>img{
		width:30px;
		height:30px;
		margin-top:5px;
	}
	.allRating>li .content{
		flex:1;
		padding-left: 10px;
	}
	.allRating>li .content .username i{
		line-height:20px;
		font-size:14px;
		color:#333;
		
	}
	.allRating>li .content .username em{
		color:#666;
	}
	.star{
		margin-bottom: 5px;
	}
	.food_name span{
		display:inline-block;
		border:1px solid #eee;
		margin-right:10px;
		padding: 2px 5px;
		margin-bottom: 10px;
		color:#666;
	}
</style>