<template>
	<div id='my' class='pages'>
		<header class='nav-bar'>
			<span>&lt;</span>
			<h1 class="title">我的</h1>
		</header>
		<div class='buyerInfo'>
			<img src='/static/images/1_03.jpg' />
			<b>
				<h1 @click="btnAction()">登陆/注册</h1>
				<span>登陆后享受更多特权</span>
				<i>&gt;</i>
			</b>
		</div>
		<div class='money'>
			<li>
				<img src='/static/images/1_07.jpg' />
				<p>优惠</p>
			</li>
			<li>
				<img src='/static/images/1_09.jpg' />
				<p>金币</p>
			</li>
		</div>
		<p>
			<img src="/static/images/1_13.jpg" />
			我的地址
			<i>&gt;</i>
		</p>
		<p>
			<img src="/static/images/1_16.jpg" />
			积分商城
			<i>&gt;</i>
		</p>
		<p>
			<img src="/static/images/1_18.jpg" />
			我的客服
			<i>&gt;</i>
		</p>
		<p>
			<img src="/static/images/1_20.jpg" />
			现在饿了么APP
			<i>&gt;</i>
		</p>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		methods:{
			btnAction(){
				this.$router.push('/my/login');
			}
		}
	}
</script>

<style>
	#my{
		background: #F5F5F5;
		overflow: auto;
	}
	#my .nav-bar{
		position: relative;
	}
	#my .nav-bar span{
		line-height:40px;
		font-size:30px;
		position: absolute;
		top:0;
		left:0;
		padding-left: 10px;
	}
	.buyerInfo{
		width:100%;
		height:80px;
		background:#0096ff;
		padding:10px ;
		display: flex;
	}
	.buyerInfo img{
		width:50px;
		height:50px;
		border-radius: 50%;
	}
	.buyerInfo b{
		flex:1;
		padding-left: 20px;
		color:#fff;
		position: relative;
	}
	.buyerInfo b>h1{
		font-size:18px;
		line-height: 30px;
		font-weight: bold;
	}
	.buyerInfo b>i{
		position:absolute;
		right:10px;
		top:10px;
		font-size:16px;
	}
	.money{
		width:100%;
		height:70px;
		display: flex;
		background: #fff;
	}
	.money>li{
		flex:1;
		border-right: 1px solid #eee;
		text-align: center;
	}
	.money>li:last-child{
		border-right:none;
	}
	.money>li>img{
		margin-top:15px;
		margin-bottom: 5px;
	}
	#my>p{
		line-height:40px;
		background: #fff;
		margin-top:10px;
		font-size: 14px;
		position:relative;		
	}
	#my>p:last-child{
		margin-top:0;
	}
	#my>p>img{
		margin-left:10px;
		margin-right: 10px;
	}
	#my>p>i{
		font-size:14px;
		position: absolute;
		top:0;
		right:10px;
	}
	.sub-page{
		position: absolute;
		left:0;
		top:0;
		bottom: 0;
	}
</style>