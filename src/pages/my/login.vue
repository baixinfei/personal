<template>
<div id="login">
		<div class='logo'>
			<img src='static/images/logo_03.jpg' />
		</div>
		<nav>
			<li><span class='active'>短信登陆</span></li>
			<li><span>密码登陆</span></li>
		</nav>
		<div class='loginInfo'>
			<input type='number' placeholder="手机号"/>
			<input type='number' placeholder="验证码"/>
			<p>温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意<a href="#">《用户服务协议》</a></p>
			<span>登录</span>
			<i>关于我们</i>
		</div>
		
	<!--<div class='content'>
		<input type='text' placeholder="账号" class='account-name' v-model='name'/>
		<input type='password' placeholder="密码" v-model='psw'/>
		<p>
			<input type='checkbox' />记住密码     
			<u>忘记密码？</u>
		</p>
		<button class='accept' @click="userLogin()">登陆</button>
	</div>-->
	
</div>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				psw:''
			}
		},
		methods:{
			goRegister(){
				this.$router.push('/my/register');
			},
			back(){
				this.$router.push('/my')
			},
			userLogin(){
				var arr = JSON.parse(localStorage.getItem('userInfo'));
				for(var i = 0;i<arr.length;i++){
					if(this.name==arr[i].name&&this.psw==arr[i].psw){
						this.$router.push('/my')
						this.$event.$emit('username', this.name);
					}
					
				}
			}
		}
	}
	
	
	
</script>

<style>
#login{
	width:100%;
	height:100%;
	position:absolute;
	top:0;
	left:0;
	bottom:0;
	z-index:50;
	background: #fff;
}
#login .logo{
	width:100%;
	height:100px;
	text-align: center;
	line-height: 20px;
	
}
.logo img{
	margin-top:30px;
}
#login nav{
	width:100%;
	height:40px;
	display: flex;
}
#login nav li{
	flex:1;
	line-height:40px;
	font-size:14px;
	text-align: center;
}
#login nav li span.active{
	color: #2395ff;
    font-weight: 700;
    border-bottom: 2px solid #2395ff;
}
.loginInfo{
	width: 90%;
	margin-left:5%;
}
.loginInfo input{
	width:100%;
	height:50px;
	margin-top:20px;
	border-radius: 5px;
	border:none;
	border:1px solid #eee;
	padding-left: 10px;
}
.loginInfo p{
	line-height:24px;
	margin-top:5px;
	color:#999;
}
.loginInfo span{
	display: block;
	height:42px;
	text-align: center;
	margin-top: 30px;
    border-radius: 4px;
    background: #4cd96f;
    color: #fff;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
	
}
.loginInfo i{
	display: block;
	line-height: 20px;
	text-align: center;
	margin-top:20px;
	color: #999;
}
</style>