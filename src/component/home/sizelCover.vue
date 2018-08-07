<template>
	<div id='goodsCover' class='pages' >
		<div class='sizeInfo'>
			<h5>
				{{goodsSize.name}}	
				<i @click="close">X</i>
			</h5>
			
			<p>规格</p>
			<span v-for="(item,index) in goodsSize.specfoods" 
				 :class="{active: index == selectIndex}"
				 @click="changeActive(index)"
				 >{{item.specs[0].value}}</span>
			<p class='pirce'>
				<i>￥{{goodsSize.specfoods[0].price}}</i>
				<em @click="choiced(goodsSize.specfoods[0].price)">选好了</em>
			</p>
			
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				selectIndex:0
			}
		},
		props:['goodsSize'],
		methods:{
			changeActive(index){
				this.selectIndex = index
			},
			choiced(n){
				this.$emit('hidden',false,n)
			},
			close(){
				this.$emit("hidden",false,'')
			}
		}
	}
</script>

<style>
	#goodsCover{
		position: absolute;
		top:-170px;
		bottom:0;
		left:0;
		background:rgba(54, 49, 49, 0.5);
		z-index:50;
		color: #fff;
		
	}
	#goodsCover .sizeInfo{
		width:80%;
		background: #fff;
		position:absolute;
		left:10%;
		top:45%;
		
		
	}
	.sizeInfo h5{
		line-height:30px;
		font-size:14px;
		color:#666;
		text-align:center;
		position: relative;
	}
	.sizeInfo h5 i{
		position: absolute;
		right:20px;
		top:0;
	}
	.sizeInfo p{
		line-height: 20px;
		color:#666;
		padding: 0 10px;
	}
	.sizeInfo>span{
		display: inline-block;
		line-height: 20px;
		border:1px solid #666;
		border-radius: 15px;
		margin-right:15px;
		color:#666;
		padding:2px 4px;
		margin-left:10px;
	}
	.sizeInfo>span.active{
		color:#0096FF;
		border-color: #0096FF;
	}
	.pirce{
		width:100%;
		height:40px;
		line-height:40px;
		background: #EEEEEE;
		position: relative;
		margin-top:20px;
	}
	.pirce>i{
		color:red;
		font-size:16px;
		font-weight: 700;
		line-height:40px;
	}
	.pirce>em{
		position: absolute;
		right:0;
		top:0;
		width:60px;
		height:40px;
		background: #0096FF;
		color:#fff;
		text-align: center;
		line-height: 40px;
	}
</style>