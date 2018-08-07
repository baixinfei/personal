<template>
	<div class='cart'>
		<p>{{selllerad}}</p>
		<div class='detail' v-show="goodsflag">
			<p>已选商品 <span @click="deletegoods()">清空</span></p>
			<li v-for='(item,s) in goods' >
				<span>{{item.name}}</span>
				<i>
					<em>￥{{item.specfoods[0].price}}</em>
					<i @click="reduce(s)">-</i>
					<span>{{item.num}}</span>
					<b @click='add(s)'>+</b>
				</i>
			</li>
		</div>
		<div class='send_free'>
			<span @click="show()"></span>
			<div class='free'>
				<b>￥{{total}}</b>
				<em>配送费￥{{sellerId.float_delivery_fee}}</em>
			</div>
			<i v-if="total == 0">￥{{sellerId.float_minimum_order_amount}}起送</i>
			<i v-if="total>0&&total<sellerId.float_minimum_order_amount">还差￥{{sellerId.float_minimum_order_amount - total}}起送</i>
			<p class='account' v-if="total>sellerId.float_minimum_order_amount" @click="goAccount(goods)">去结算</p>
		</div>
		
	</div>
</template>

<script>
	import Vuex from 'vuex'
	import {getSellerInfo} from "../../service/homeService.js"
	export default{
		data(){
			return{
				active:'',
				goods:'',
				total:0,
				goodsflag:false,
				seller:{}
			}
		},
		props:['sellerId','selllerad'],
		computed:{
			...Vuex.mapState(['latitude','longitude'])
		},
		methods:{
			add(s){
				this.goods[s].num++;
				this.total += (this.goods[s].num-1) * this.goods[s].specfoods[0].price;
			},
			reduce(s){
				this.goods[s].num--;
				this.total -= this.goods[s].specfoods[0].price;
				if(this.goods[s].num<=0){
					this.goods.splice(s,1);
				}
			},
			show(){
				this.goodsflag = true;
				
			},
			goAccount(goods){
				console.log(goods); 
				this.$store.commit('addOrder', goods);
				//this.$router.push('/order')
			},
			deletegoods(){
				this.goods = '';
			}
		},
		created(){
			this.$event.$on('getnum',(res)=>{
				this.goods = res;
			})
			this.$event.$on('count',(res)=>{
				this.total = res;
			})
			
		}
	}
</script>

<style>
	.cart{
		position: absolute;
		left:0;
		bottom:0;
		width:100%;
		z-index:30;
	}
	.cart>p{
		line-height:20px;
		background-color: #fffad6;
		height:20px;
		text-align: center;
	}
	.cart .detail{
		background: #fff;
	}
	.cart .detail li{
		height:30px;
		line-height:30px;
		padding: 0 10px;
		position: relative;
	}
	.cart .detail>p{
		line-height:24px;
		position: relative;
	}
	.cart .detail>p>span{
		line-height:24px;
		position: absolute;
		right:10px;
		top:0;
		background: lightcoral;
		color:#fff;
	}
	.cart .detail li>span{
		height:30px;
		line-height:30px;
		color:#666;
		font-size:14px;
		position: absolute;
		left:10px;
		top:0;
	}
	.cart .detail li>i{
		display: block;
		height:30px;
		line-height:30px;
		position: absolute;
		right:10px;
		top:0;
	}
	.cart .detail li>i>em{
		color:red;
	}
	.cart .detail li>i>i{
		display: inline-block;
		width:20px;
		height:20px;
		background: #fff;
		border:1px solid #0089DC;
		border-radius: 50%;
		font-weight: bold;
		color:#fff;
		text-align: center;
		line-height: 20px;
		color:#0089DC;
	}
	.cart .detail li>i>b{
		display: inline-block;
		font-size:14px;
		width:20px;
		height:20px;
		background: #0089DC;
		border-radius: 50%;
		font-weight: bold;
		color:#fff;
		text-align: center;
		line-height: 20px;
	}
	.goodsInfo>h6>p>span{
		display: inline-block;
		font-size:14px;
		width:20px;
		height:20px;
		color:#666;
		text-align: center;
		line-height: 20px;
	}
	.cart .send_free{
		width:100%;
		height:44px;
		position: relative;	
		background:#505051;
		padding-left: 20px;
	}
	.cart .send_free>span{
		width:44px;
		height:43px;
		
		background: url(/static/images/3_03.jpg) no-repeat;
		position: absolute;
		left:0;
		top:-10px;
	}
	.send_free .free{
		position: absolute;
		left:60px;
		top:0;
	}
	.send_free .free>b{
		display: block;
		font-size:14px;
		color: #fff;
		font-weight: 700;
	}
	.send_free .free>em{
		display: block;
		color: #999;	
	}
	.send_free>i{
		position: absolute;
		right:10px;
		top:15px;
		color: #fff;
	    text-align: center;
	    font-size: 14px;
	    font-weight: 700;
	    line-height: 20px;
	}
	.send_free .account{
		height:44px;
		width:70px;
		line-height:44px;
		text-align: center;
		color:#fff;
		background: #4cd964;
		font-size: 14px;
	    font-weight: 700;
	    position: absolute;
	    top:0;
	    right:0;
	}
</style>