<template>
  <div id="app">
	  <keep-alive>
	  	<router-view></router-view>
	  </keep-alive>
	  <nav class='tabs'>
	  	<router-link class="tab" v-for="(tab,i) in tabList" :to="tab.path" :key="i">
  			<span class="tabicon" :class="tab.icon"></span>
  			<em>{{tab.title}}</em>
  		</router-link>
	  </nav>
  </div>
</template>

<script>
export default{
		data(){
			return {
				tabList:[
					{title:'外卖',path:'/home', icon: 'icon-eleme'},
					{title:'发现',path:'/discover', icon: 'icon-discover'},
					{title:'订单',path:'/order', icon: 'icon-order'},
					{title:'我的',path:'/my', icon: 'icon-me'},
					
				]
			}
		}
	}
</script>

<style>
#app {
  width:100%;
  height:100%;
}
.nav-bar{
	width: 100%;
	height: 44px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	background: #0096ff;
	color:#fff;
}
.title{
	width: 100%;
	line-height: 44px;
	text-align: center;
	color: #fff;
	font-size: 14px;
	
}
.pages{
	width:100%;
	position: absolute;
	left:0;
	top:0;
	bottom:49px;
	background: #f5f5f5;
	overflow: hidden;
}
.tabs{
	width:100%;
	height:49px;
	position: absolute;
	left:0;
	bottom:0;
	z-index:10;
	display: flex;
	background: #f8f8f8;
}
.tabs:before{
	content:'';
	display: block;
	height:1px;
	width:100%;
	border-top:1px solid #d2d2d2;
	position:absolute;
	top:-1px;
	left:0;
	transform: scaleY(0.5);
	
}
.tabs .tab{
	flex:1;
}
.tabs .tab .tabicon{
	display: block;
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 36px;
	color: #666;
	margin-bottom:1px;
}
.tabs .tab.router-link-active .tabicon{
	color: #0089dc;
}
.tabs .tab>em{
	display: block;
	width: 100%;
	height: 24px;
	text-align: center;
	font-size: 12px;
	font-style: normal;
	color: #666;
}
.tabs .tab.router-link-active .title{
	color: #0089dc;
}
</style>
