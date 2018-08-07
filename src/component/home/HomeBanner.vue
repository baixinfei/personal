<template>
	<div class="home-banner">
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide" v-for="list in classfify">
		        	<div class="banner-item" v-for="item in list">
						<img :src="handleImg(item.image_hash)" />
						<p>{{item.name}}</p>
					</div>
		        </div>
		    </div>
		    <div class="swiper-pagination"></div>
		</div>
</div>	
</template>

<script>
	import Vuex from 'vuex'
	import {banner} from '../../service/homeService.js'
	import {handleImg} from '../../common/common.js'
	var bannerSwiper
	export default{
		data(){
			return{
				classfify:[]
			}
		},
		computed:{
			...Vuex.mapState({
				lat:'latitude',
				log:'longitude',
				tem:'templates[]'
			}),
		},
		methods:{
			handleImg
		},
		created(){
			var that=this;
			banner(this.lat,this.log,this.tem).then((result)=>{
				var arr = result;
				while(result.length>0){
					var arr1= arr.splice(0,8);
					this.classfify.push(arr1);
				}
			})
		},
		mounted(){
		  	bannerSwiper = new Swiper ('.swiper-container', {
			    pagination: '.swiper-pagination'
			})  
		},
		updated(){
			bannerSwiper.update();
		}
	}
</script>

<style>
.home-banner{
	background: #fff;
}
.home-banner .banner-item{
	width: 25%;
	float: left;
	margin-top: 10px;
}
.home-banner .banner-item img{
	width: 50%;
	margin-left:25%;
}
.home-banner .banner-item p{
	text-align: center;
	font-size: 12px;
	color: #666;
}
.home-banner .swiper-wrapper{
	width:100%;
	height:100%;
	box-sizing: border-box;
	padding-bottom: 16px;
}
.home-banner .swiper-pagination{
	bottom: 0px;
}
/* .home-banner .swiper-pagination-bullet{
	width: 4px;
	height: 4px;
} */
.home-banner .swiper-pagination-bullet.swiper-pagination-bullet-active{
	color: #000;
	opacity: 0.6;
	background: #000;
}
</style>