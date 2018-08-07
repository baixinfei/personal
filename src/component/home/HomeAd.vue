<template>
	<div class='home-ad'>
		<img :src='handleImg(path)' />
	</div>
</template>

<script>
	import Vuex from "vuex"
	import {restaurants} from '../../service/homeService.js'
	import {handleImg} from '../../common/common.js'
	export default{
		data(){
			return{
				path:"/3/12/05997b77c8cb8adf82298b8a39434png"
			}
		},
		methods:{
			handleImg
		}
		
	}
</script>

<style>
	.home-ad{
		width:100%;
		height:80px;
	}
	.home-ad>img{
		width:100%;
		height:100%;
	}
</style>