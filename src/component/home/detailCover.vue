<template>
	<div id='detailCover' class='pages' >
		<h2>{{sellerad.name}}</h2>
		<span>优惠信息</span>
		<p  v-if='sellerad.activities.length>0' v-for="(active,index) in sellerad.activities">
			<span class='iconName' :style="{background:'#'+ active.icon_color}">{{active.icon_name}}</span>
			<span>{{active.tips}}</span>	
		</p>
		<span>商家公告</span>
		<p>{{sellerad.promotion_info}}</p>
		<em @click="change()">x</em>
	</div>
</template>

<script>
	export default{
		props:['sellerad'],
		methods:{
			change(){
				this.$emit('changeAction',false)
			}
		}
	}
</script>

<style>
	#detailCover{
		bottom:0;
		background: #262626;
		z-index:30;
		color: #fff;
		
	}
	#detailCover h2{
		margin-top:20px;
		text-align: center;
		font-size:18px;
		font-weight: 100;
	}
	#detailCover>span{
		width:60px;
		display: block;
		margin-top:30px;
		line-height:20px;
		border-radius: 10px;
		border:1px solid #D2D2D2;
		margin-left:40%;
		margin-bottom: 10px;
		
	}
	#detailCover>p{
		width:100%;
		padding-left: 20px;
		line-height:20px;
	}
	#detailCover>p>span{
		line-height:20px;
		margin:5px 0;
		width:100%;
	}
	#detailCover>em{
		display: block;
		position: absolute;
		left:45%;
		bottom:30px;
		width:40px;
		height:40px;
		border-radius: 50%;
		border: 1px solid #F2F2F2;
		font-size: 24px;
		text-align: center;
		line-height: 40px;
		color: #F2F2F2;
		
	}
</style>