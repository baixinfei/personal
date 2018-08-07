<template>
	<div>
		<div id='home' class='pages'>
			<div class='wrapper'>
				<div class="top" :class="imgClass">
					<!--<img src="static/images/ajax-loader.gif" />-->
					<img :src="refreshImg" />
					<span>{{refreshInfo}}...</span>
				</div>
				<home-header></home-header>
				<home-banner></home-banner>
				<home-ad></home-ad>
				<home-list :list='listData' @update-scroll="updateScroll" @refresh-scroll="refreshScroll"></home-list>
				<div class="bottom" :class="imgDownClass" v-if="isLoadMore">
					<img :src="loadmoreImg" />
					<span>{{loadmoreInfo}}...</span>
				</div>
			</div>
			<div class="search" v-show="showSearch">
				<span class="search-box" @click="searchAction()">搜索商家、商品名称</span>
			</div>
		</div>
		
		<transition enter-active-class="slideInRight"
			leave-active-class="slideOutRight">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import HomeHeader from '../../component/home/HomeHeader.vue'
	import HomeBanner from '../../component/home/HomeBanner.vue'
	import HomeAd from '../../component/home/HomeAd.vue'
	import HomeList from '../../component/home/HomeList.vue'
	import Vuex from "vuex"
	import {restaurants} from '../../service/homeService.js'
	let homeScroll
	export default{
		data(){
			return {
				isLoadMore: false,
				showSearch: false,
				refreshInfo: '下拉可以刷新',
				loadmoreInfo: '上拉加载更多',
				refreshImg: 'static/images/arrow.png',
				loadmoreImg: 'static/images/arrow.png',
				imgClass: '',
				imgDownClass: '',
				requestLimit: 20,
				listData: []
				}
		},
		watch:{
			'$route'(to,from){
				//console.log(to);
			}
		},
		computed:{
			...Vuex.mapState(['latitude', 'longitude']),
		},
		components:{
			'home-header':HomeHeader,
			'home-banner':HomeBanner,
			'home-ad':HomeAd,
			'home-list':HomeList,
		},
		methods: {
			refreshScroll(){
				homeScroll.refresh();
			},
			updateScroll(){
				homeScroll.refresh();
				setTimeout(()=>{
					//计算滚动视图当前最大的滚动范围
					var maxScrollY = homeScroll.wrapper.offsetHeight - homeScroll.scroller.offsetHeight;
					//所在位置大于了最大滚动范围，回到最底部
					if(maxScrollY > homeScroll.y ){
						homeScroll.scrollTo(0 , maxScrollY);
					}
				})
				
			},
			requestListData(flag){
				restaurants(this.latitude, this.longitude, this.listData.length, this.requestLimit)
				.then((result)=>{
					console.log(result);
					if(flag === 'refresh'){
						this.listData = [];
					}
					this.listData = this.listData.concat(result);
					
					//修改加载更多实现信息
					this.loadmoreImg = 'static/images/arrow.png';
					this.loadmoreInfo = '上拉加载更多';
				})
			}
		},
		
		created(){
			//先加载数据
			this.requestListData();
			//地址改变是重新请求数据
			this.$event.$on('update-data', ()=>{
				//刷新首页面的列表
				this.requestListData('refresh');
			})
		},
		mounted(){
			homeScroll = new IScroll('#home', {
				probeType: 2,
				tap:true
			});
			//滚动到头部在最顶部
			homeScroll.scrollTo(0, -40);
			
			homeScroll.on('scrollStart', ()=>{
				if(homeScroll.maxScrollY < 0){
					this.isLoadMore = true;
				}
				homeScroll.refresh();
				
			})
			homeScroll.on('scroll', ()=>{
	//			console.log(homeScroll.y)
				if(homeScroll.y <= -80){
					this.showSearch = true;
				}else{
					this.showSearch = false;
				}
				//判断下拉刷新的条件是否满足
				if(homeScroll.y >= 0){
					//满足
					this.imgClass = 'up';
					this.refreshInfo = '释放立即刷新';
				}else{
					this.imgClass = '';
					this.refreshInfo = '下拉可以刷新';
				}
				//判断上拉加载更多
				if(homeScroll.y <= homeScroll.maxScrollY){
					this.imgDownClass = 'down';
				}else if(homeScroll.y > homeScroll.maxScrollY){
					this.imgDownClass = '';
				}
//				if(homeScroll.y <= homeScroll.maxScrollY){
//					imgDownClass = 'down'
//				}
//				else if(homeScroll.y > homeScroll.maxScrollY){
//					imgDownClass = ''
//				}
				
			})
			homeScroll.on('scrollEnd', ()=>{
	//			console.log(homeScroll.y);
				//用户下拉的，但是没有达到刷新条件
				if(homeScroll.y > -40 && homeScroll.y < 0){
					homeScroll.scrollTo(0, -40, 200);
				}
				if(homeScroll.y >= 0){
					//刷新触发了
					//换刷新的图片
					this.refreshImg = 'static/images/ajax-loader.gif';
					this.refreshInfo = '正在刷新';
					//让子组件刷新
					this.$event.$emit('update-data');
					//收起刷新div
					setTimeout(()=>{
						this.refreshImg = 'static/images/arrow.png';
						this.refreshInfo = '下拉可以刷新';
						homeScroll.scrollTo(0, -40, 200);
					}, 1000);
				}
				//用户上拉加载更多
				let realY = homeScroll.maxScrollY + 40;
				//不满足条件回到原位置
				if(homeScroll.y < realY && homeScroll.y > homeScroll.maxScrollY){
					homeScroll.scrollTo(0,realY,200);
				}
				//满足条件
				if(homeScroll.y <= homeScroll.maxScrollY){
					this.loadmoreImg = 'static/images/ajax-loader.gif';
					this.loadmoreInfo = '正在加载';
					this.requestListData();
					
				}
			})
		}
		
	}
	
</script>

<style>
#home .wrapper .top, #home .wrapper .bottom{
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	padding-top: 8px;
	overflow: hidden;
	line-height: 32px;
	text-align: center;
	color: #0085FF;
	font-size: 14px;
}
#home .wrapper .top img, #home .wrapper .bottom img{
	width: 24px;
	height: 24px;
	display: inline-block;
	transform: rotate(180deg);
	transition: 300ms transform;
}
#home .wrapper .bottom img{
	transform: rotate(0);
}
#home .wrapper .bottom.down img{
	transform: rotate(180deg);
}
#home .wrapper .top.up img{
	transform: rotate(0deg);
}
#home>.search{
	position: absolute;
	top: 10px;
	left: 0;
	background: #0085ff;
}
</style>