<template>
<div id="register" class="sub-page">
	<header class="nav-bar">
		<h1 class="title">
			<span class='back' @click='$router.back()'></span>
			注册
			<button class='share' @click="goLogin()">登陆</button>
		</h1>	
	</header>
	<div class='content'>
		<input type='text' placeholder="账号" class='account-name' v-model='name' @blur="confirmname()"/>
		<input type='password' placeholder="密码" v-model="psw" @blur="confirmpsd()"/>
		<input type='password' placeholder="重复密码" v-model="confirmPsw" @blur="confirmPsd()"/>
		<button class='accept' @click='confirm()'>同意服务协议并注册</button>
		<p>{{item}}</p>
	</div>
	
	
</div>
</template>

<script>
	export default{
		data(){
			var str = localStorage.getItem('userInfo');
			var arr1 = str?JSON.parse(str):[];
			return{
				name:'',
				psw:'',
				confirmPsw:'',
				flag1:false,
				flag2:false,
				flag3:false,
				item:'',
				arr:arr1
				
			}
		},
		methods:{
			goLogin(){
				this.$router.push('/my/login')
			},
			confirmname(){
				var str1 = this.name;
				var reg1 = /^[a-zA-Z_]\w{5,14}$/;
				if(reg1.test(str1)){
					this.flag1 = true;
					this.item = '用户名合法';
				}else{
					this.flag1 = false;
					this.item = '用户名只能使用数字字母下划线, 且数字不能开头, 长度在6-15位';
				}
			},
			confirmpsd(){
				var str2 = this.psw;
				var reg2 = /^.{8,}$/;
				if(reg2.test(str2)){
					this.flag2 = true;
					this.item = '密码合法';
					
				}else{
					this.flag2 = false;
					this.item = '密码至少8位以上';
				}
			},
			confirmPsd(){
				var str3 = this.confirmPsw
				if(str3==this.psw){
					this.flag3 = true;
					this.item = '密码一致';
				}else{
					this.flag3 = false;
					this.item = '两次密码不一致';
				}
			},
			confirm(){;
				if(this.flag1&&this.flag2&&this.flag3){
					this.item = '全部正确';
					var obj = {
						name:this.name,
						psw:this.psw
					}
					this.arr.push(obj);
					var str2=JSON.stringify(this.arr);
					localStorage.setItem('userInfo',str2);
					this.$router.push('/my/login');
					this.name = '';
				    this.psw = '';
					this.confirmPsw = '';
				}else{
					this.item = '不正确';
				}
			}
		}
	}
	
	
	
</script>

<style>
#register{
	width:100%;
	height:100%;
	background: #F7F7F7;
	position:absolute;
	top:0;
	left:0;
	bottom:0;
	z-index:20;
} 
.share{
width:53px;
height:26px;
border-radius: 5px;
background: #f65984;
position: absolute;
top:10px;
right:10px;
}
#register .content{
	position:absolute;
	left:0;
	top:44px;
	bottom:49px;
}
#register .content>input{
	width:80%;
	height:40px;
	margin-bottom:20px;
	margin-left:10%;
	border-radius: 5px;
	padding-left:10px;
}
#register .content>p{
	line-height:20px;
	font-size:14px;
	margin-left:10%;
	width:80%;
}
.accept{
	width:80%;
	height:40px;
	line-height:40px;
	text-align: center;
	background: #f55a86;
	color:#fff;
	font-size:14px;
	margin-top:10px;
	border-radius: 5px;
	margin-left:10%;
	border:none;
}
.account-name{
	margin-top:40px;
}
</style>